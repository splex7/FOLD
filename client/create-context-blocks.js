var searchDep = new Tracker.Dependency();

var i = 0;

var count = function(){
  return i++;
};

var createBlockHelpers = {
  startingBlock: function() {
    if (this instanceof ContextBlock) {
      return this;
    }
  },
  isFocused: function () {
    var focusResult = Template.instance().focusResult.get();
    if (_.isObject(focusResult)) {
      if (this._id === focusResult._id) {
        return true;
      }
    }
  },
  isActive: function () {
    var focusResult = Template.instance().focusResult.get();
    if (_.isObject(focusResult)) {
      return true;
    }
  },
  selected: function() {
    return (this.source === Template.instance().source.get());
  },
  loading: function() {
    if (Template.instance().loadingResults)
      return Template.instance().loadingResults.get()
  },
  noMoreResults: function() {
    if (Template.instance().noMoreResults)
      return Template.instance().noMoreResults.get()
  },
  results: function () {
    searchDep.depend();
    return Template.instance().existingSearchResults()
  }
};


searchScrollFn = function(d, template) {
  var searchContainer = $("ol.search-results-container");

  if ((searchContainer.scrollTop() + searchContainer.height()) === searchContainer[0].scrollHeight && !template.loadingResults.get()) {
    if (template.existingSearchResults().count()){ // confirm there are already results and we're scrolling down{
      template.search();
    }
  }
};

throttledSearchScrollFn = _.throttle(searchScrollFn, 20);

var addContext = function(contextBlock) {
  var contextId = ContextBlocks.insert(contextBlock);
  return window.addContextToStory(Session.get("storyId"), contextId, Session.get("currentY"));
};

var createBlockEvents = {
  "click .data-source": function(d, template) {
    template.source.set(this.source);
  },

  "submit form": function(d, template) {
    d.preventDefault();
    if(!template.loadingResults.get()){
      if (!template.existingSearchResults || !template.existingSearchResults().count()) {  // confirm there are no results yet
        template.search();
      }
    }
  },

  "scroll ol.search-results-container": throttledSearchScrollFn,

  "click li": function(d, template) {
    template.focusResult.set(this);
  },

  "click .add-button": function(d, template) {
    addContext(template.focusResult.get());
  },
  "click .cancel": function() {
    Session.set('addingContext', false);
    return Session.set('editingContext', null);
  }
};

var getSearchInput = function(){
  try { // wrap in try in case dom isn't ready
    return {
      query: this.$('input[type="search"]').val(),
      option: this.$('input[name=option]:checked').val()
    }
  } catch (e) {
    return {};
  }

};

var setSearchInput = function(query){
  try { // wrap in try in case dom isn't ready
    this.$('input[type="search"]').val(query);
  } catch (e) {
    return {};
  }

};


var existingSearchResults = function(){
  inputs = getSearchInput.call(this);
  return SearchResults.find({
    searchQuery: inputs.query,
    searchOption: inputs.option,
    type: this.type,
    source: this.source.get()
  }, {sort: {ordinalId: 1} })
};



var searchAPI = function(query) {
  var source = this.source.get();
  var type = this.type;
  var page;

  var inputs = getSearchInput.call(this);
  var query = inputs.query;
  var option = inputs.option;

  var mostRecentResult = this.existingSearchResults().fetch().slice(-1)[0];


  if (mostRecentResult) {
    page = mostRecentResult.nextPage;
  }

  if (page === 'end') { // return if at end of possible results
    this.noMoreResults.set(true);
    this.loadingResults.set(false);
    return;
  }

  this.noMoreResults.set(false);
  this.loadingResults.set(true);


  var that = this;
  searchDep.changed();

  integrationDetails = searchIntegrations[this.type][source];

  Meteor.call(integrationDetails.methodName, query, option, page, function(err, results) {
    var items = results.items;
    var nextPage = results.nextPage;

    if (err) {
      alert(err);
      return;
    }
    if (!items || !items.length) {
      that.noMoreResults.set(true);
      that.loadingResults.set(false);
      return;
    }
    _.chain(items)
      .map(integrationDetails.mapFn || _.identity)
      .each(function(item, i) {
        _.extend(item, {
          type : type,
          source: source,
          authorId : Meteor.user()._id,
          searchQuery : query,
          searchOption : option,
          nextPage: nextPage,
          ordinalId: count(),
          fullDetails: items[i] // include all original details from the api
        });

        SearchResults.insert(item);
      });

    // finish search
    that.loadingResults.set(false);
  });
};

var searchIntegrations = {
  video: {
    youtube: {
      methodName: 'youtubeVideoSearchList',
      mapFn: function(e){
        return {
          title: e.title,
          description: e.description,
          referenceId: e.videoId,
          referenceUsername : e.channelTitle,
          referenceUserId : e.channelId,
          referenceCreationDate : e.publishedAt.substring(0,10).replace( /(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1")
        }
      }
    }
  },
  audio: {
    soundcloud: {
      methodName: 'soundcloudAudioSearchList',
      mapFn: function(e){
        return {
          title: e.title,
          description: e.description,
          referenceId: e.id,
          referenceUsername : e.channelTitle,
          referenceUsernameId : e.user_id,
          referenceCreationDate : e.created_at.substring(0,10).replace( /(\d{4})-(\d{2})-(\d{2})/, "$2/$3/$1"),
          soundcloudArtworkUrl: e.artwork_url
        }
      }
    }
  },
  image: {
    imgur: {
      methodName: 'imgurImageSearchList',
      mapFn: function(e) {
        return {
          referenceId : e.id,
          referenceUsername : e.account_url,
          referenceUserId : e.account_id,
          fileExtension: e.link.substring(e.link.lastIndexOf('.') + 1),
          section : e.section,
          title : e.title
        }
      }
    },
    flickr: {
      methodName: 'flickrImageSearchList',
      mapFn: function(e) {
        return {
          flickrImgFarm: e.farm,
          flickrImgSecret: e.secret,
          referenceId: e.id,
          flickrServer: e.server,
          title: e.title
        }
      }
    }
  },
  gif: {
    giphy: {
      methodName: 'giphyGifSearchList',
      mapFn: function(e){
        return {
          referenceId: e.id,
          referenceUsername: e.username,
          referenceSource: e.source
        }
      }
    }
  }
};



var createTemplateNames = [
  'create_image_section',
  'create_gif_section',
  'create_video_section',
  'create_map_section',
  'create_text_section',
  'create_audio_section',
  'create_viz_section'
];

_.each(createTemplateNames, function(templateName){
  Template[templateName].helpers(createBlockHelpers);
  Template[templateName].events(createBlockEvents);
});


Template.create_audio_section.events({
  "dblclick li": function (d, template) {
    addContext(this);
  }
});

Template.create_video_section.events({
  "dblclick li": function (d, template) {
    addContext(this);
  }
});

searchTemplateCreatedBoilerplate = function(type, defaultSource) {
  return function() {
    this.type = type;
    this.source = new ReactiveVar(defaultSource);

    this.loadingResults = new ReactiveVar();
    this.focusResult = new ReactiveVar();
    this.noMoreResults = new ReactiveVar();

    this.search = _.bind(searchAPI, this);
    this.existingSearchResults = _.bind(existingSearchResults, this);
    this.getSearchInput = _.bind(getSearchInput, this);
    this.setSearchInput = _.bind(setSearchInput, this);

    var that = this;

    this.autorun(function(){
      searchDep.depend();
      that.noMoreResults.set(false);
    });
  };
};

searchTemplateRenderedBoilerplate  = function() {
  return function() {
    var that = this;

    this.autorun(function(){
      searchDep.depend();
      if (that.getSearchInput().query) {
        Session.set('query', that.getSearchInput().query);
      } else {
        that.setSearchInput(Session.get('query'));
      }
    });

  };
};


Template.create_video_section.created = searchTemplateCreatedBoilerplate('video', 'youtube');
Template.create_video_section.rendered = searchTemplateRenderedBoilerplate();


// TODO autosearch when change between sources
Template.create_image_section.created = searchTemplateCreatedBoilerplate('image', 'flickr');
Template.create_image_section.rendered = searchTemplateRenderedBoilerplate();


Template.create_gif_section.created = searchTemplateCreatedBoilerplate('gif', 'giphy');
Template.create_gif_section.rendered = searchTemplateRenderedBoilerplate();


var dataSourcesByType = {
  'image': [{source: 'flickr', 'display': 'Flickr'}, {source: 'imgur', display: 'Imgur'}],
  'viz': [{source: 'oec', display: 'Observatory of Economic Complexity'}],
  'gif': [{source: 'giphy', display: 'Giphy'}],
  'video': [{source: 'youtube', display: 'Youtube'}],
  // 'map': [{source: 'google', display: 'Google Maps'}],
  'audio': [{source: 'soundcloud', display: 'SoundCloud'}],
}

_.each(dataSourcesByType, function(dataSources, type){
  var templateName = 'create_' + type + '_section';
  Template[templateName].helpers({dataSources: dataSources});
});


Template.create_audio_section.created = searchTemplateCreatedBoilerplate('audio', 'soundcloud');
Template.create_audio_section.rendered = searchTemplateRenderedBoilerplate();


Template.create_viz_section.created = function() {
  this.type = 'viz';
  this.source = new ReactiveVar('oec');

  this.directions = ['import', 'export'];
  this.countries = VizBlock.countries;
  this.years = [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];

  this.selectedCountry = new ReactiveVar(this.countries[Math.floor(Math.random() * this.countries.length)].id);
  this.selectedDirection = new ReactiveVar('export');
  this.selectedYear = new ReactiveVar(2012);

  this.focusResult = new ReactiveVar();

  var that = this;
  this.autorun(function() {
    var oecYear = that.selectedYear.get();
    var oecCountryCode = that.selectedCountry.get();
    var oecDirection = that.selectedDirection.get();

    that.focusResult.set(new VizBlock({
      oecCountry: oecCountryCode,
      oecYear: oecYear,
      oecDirection: oecDirection,
      authorId : Meteor.user()._id,
      type: that.type,
      source: that.source.get()
    }));
  });
};


Template.create_viz_section.rendered = function() {
  $("select").selectOrDie({size: 8});
};

Template.create_viz_section.helpers({
    cardWidth: function() { return Session.get('cardWidth') - 40; } ,
    directions: function() { return Template.instance().directions; },
    countries: function() { return Template.instance().countries; },
    years: function() { return Template.instance().years; },
    selectedYear: function() { return Template.instance().selectedYear.get(); },
    selectedCountry: function() { return Template.instance().selectedCountry.get(); },
    selectedDirection: function() { return Template.instance().selectedDirection.get(); },
    isSelectedYear: function() { return (this == Template.instance().selectedYear.get()); },
    isSelectedCountry: function() { return (this.id === Template.instance().selectedCountry.get()); },
    isSelectedDirection: function() { return (this === Template.instance().selectedDirection.get()); },
    url: function() {
      var preview = Template.instance().focusResult.get();
      if (preview) {
        return preview.url()
      }
    }
  }
);

Template.create_viz_section.events({
  "change select.countries": function(e, t) {
    t.selectedCountry.set($(e.target).find('option:selected').data('id'));
  },
  "change select.years": function(e, t) {
    t.selectedYear.set($(e.target).val());
  }
})

Template.create_map_section.created = function() {
  this.loadingResults = new ReactiveVar();
  this.focusResult = new ReactiveVar();

  var that = this;
  this.search = function(){
    input = getSearchInput.call(this);

    that.focusResult.set(new MapBlock({
      mapQuery: input.query,
      mapType: input.option,
      authorId : Meteor.user()._id
    }))
  };
};

Template.create_map_section.helpers({
  url: function() {
    var preview = Template.instance().focusResult.get();
    if (preview) {
      return preview.url()
    }
  },
  previewUrl: function() {
    var preview = Template.instance().focusResult.get();
    if (preview) {
      return preview.previewUrl()
    }
  }
});

Template.create_text_section.helpers({
  startingBlock: function() {
    if (this instanceof ContextBlock) {
      return this;
    }
  }
});

Template.search_form.events({
  'keydown': function(){
    searchDep.changed();
  }
});

Template.search_form.helpers({
  placeholder: function() {
    return 'e.g. ' +
      _.sample([
        'radar',
        'competitive fly fishing',
        'net neutrality',
        'synthetic biology',
        'beekeeping',
        'quantum mechanics',
        'bitcoin mining',
        'glass blowing',
        'falconry',
        'origami',
        'table tennis',
        'llama training',
        ]);
  }
});


// Template.create_image_section.events({
//   "click div.save": function(d) {
//     var context, description, horizontalIndex, horizontalSections, newDocument, parentSection, srcE, url;
//     srcE = d.srcElement ? d.srcElement : d.target;
//     parentSection = $(srcE).closest('section');
//     horizontalIndex = parentSection.data('index');
//     url = parentSection.find('input.image-url-input').val();
//     description = parentSection.find('input.image-description-input').val();
//     newDocument = {
//       type: 'image',
//       url: url,
//       description: description,
//       index: horizontalIndex
//     };
//     horizontalSections = Session.get('horizontalSections');
//     horizontalSections[Session.get('currentVertical')].data[horizontalIndex] = newDocument;
//     Session.set('horizontalSections', horizontalSections);
//     context = newDocument;
//     return renderTemplate(d, Template.display_image_section, context);
//   }
// });
