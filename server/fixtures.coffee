if (Stories.find().count() is 0)
  Stories.insert
    _id: '548781e397a6427c31384b73'
    backgroundImage: "header-image.jpg"
    headerImageAttribution: "HEALTHJASAREVIC / REUTERS"
    lastSaved: new Date 1406524368561
    publishDate: new Date 1406524369993
    published: true
    storyDashTitle: "unfolding-the-2014-ebola-outbreak"
    title: "Unfolding the 2014 Ebola Outbreak"
    userId: "vbi8MJe9DNg4JBLGg"
    verticalSections: [
      { narrativeBlock: '0', contextBlocks: [] }
      { narrativeBlock: '1', contextBlocks: ['0', '1', '2'] }
      { narrativeBlock: '2', contextBlocks: ['3','4','5','6','7','8'] }
      { narrativeBlock: '3', contextBlocks: ['9','10','11','12','13'] }
      { narrativeBlock: '4', contextBlocks: ['14','15','16','17'] }
      { narrativeBlock: '5', contextBlocks: ['18','19','20','21'] }
      { narrativeBlock: '6', contextBlocks: ['22','23','24'] }
    ]


if (NarrativeBlocks.find().count() is 0)
  [
    {
      _id: '0'
      title: "Introduction"
      content: "Earlier this year, a major outbreak of a hemorrhagic fever called Ebola began in Guinea. <span class='link' data-y='4' data-x='0'>Ebola was first reported nearly 40 years ago in 1976</span>, though the death toll of this outbreak numbers 3,000 — the largest in recorded history. Because of the <span class='link' data-y='2' data-x='0'>medical complexities of the disease</span>, there is currently no cure, and infection has spread to <span class='link' data-y='1' data-x='0'>other neighboring countries</span>. The outbreak is <span class='link' data-y='3' data-x='0'>drawing the concern of governments and international health organizations alike</span>, and responses have included both investment in health infrastructure as well as more drastic measures like border closures. In addition to the tragic loss of human life, the outbreak has severely <span class='link' data-y='5' data-x='0'>crippled the economies of the affected countries.</span>"
    }
    {
      _id: '1'
      title: "Geographic"
      content: "The recent Ebola outbreak began in a remote area of Guinea, but has since spread to neighboring countries and is currently concentrated in Guinea, Liberia, and Sierra Leone. <span class='link' data-y='1' data-x='1'>Cases of the virus have also been reported in Nigeria</span>, but the virus appears to be largely contained. This is the first time in recorded history that an outbreak of the virus has occurred in West Africa."
    }
    {
      _id: '2'
      title: "Scientific / Medical"
      content: "There is currently no vaccine or cure for Ebola, a <span class='link' data-y='2' data-x='0'>virus</span> that works by evading the human immune system and causing white blood cells to die off. The illness first causes flu-like symptoms, and can progress to <span class='link' data-y='2' data-x='2'>symptoms that can promote even greater disease transmission</span>. Ebola is spread via contact with bodily fluids like blood, and not transmitted through aerosols in the air. Health care workers are at great risk for contracting the disease, especially in areas where it is difficult for them to obtain protective equipment and where people are more likely to present at clinics in the later stages of the disease. Some people who contract the disease are held in <span class='link' data-y='2' data-x='3'>isolation chambers</span>, though these are prohibitively expensive for most clinics. It is likely that the disease was originally contracted from <span class='link' data-y='2' data-x='4'>human contact with wild animals like bats</span>, and scientists have only recently begun to understand <span class='link' data-y='2' data-x='1'>how the disease evolved to affect humans</span>. Medical professionals are working to <span class='link' data-y='2' data-x='5'>educate communities</span> about how the virus is spread, what precautions can be taken, and what symptoms to look out for."
    }
    {
      _id: '3'
      title: "Political"
      content: "Governments of the affected countries, as well as international health organizations, have had different approaches to managing the outbreak. Some responses involve border closures and involuntary quarantine; in Sierra Leone, <span class='link' data-y='3' data-x='0'>the government ordered residents to stay in their homes</span> for three days to prevent transmission of the disease. Larger organizations, like the African Union, <span class='link' data-y='3' data-x='1'>are also discussing possible responses</span> to managing the outbreak, and figuring out ways to work together with organizations like Médecins sans Frontières (MSF) and the World Health Organization (WHO). MSF has come out against mandatory quarantine, stating that it will “end up driving people underground and [jeopardize] the trust between people and health providers.” U.S. President Barack Obama is pledging funds and <span class='link' data-y='3' data-x='2'>ordering 3,000 U.S. troops to the region</span> to erect isolation facilities and strengthen communication protocols, though <span class='link' data-y='3' data-x='3'>many have criticized the global community</span> for being slow to act, and only caring about the outbreak after <span class='link' data-y='3' data-x='4'>several non-Africans became infected with the disease in late July.</span>"
    }
    {
      _id: '4'
      title: "Historical"
      content: "<span class='link' data-y='4' data-x='1'>In 1976</span>, Ebola first emerged in Sudan and Zaire, two countries in <span class='link' data-y='4' data-x='0'>Central Africa</span>. This outbreak killed approximately 300 people, and although epidemiologists studied the area extensively, Ebola’s natural reservoir in the environment was never discovered. In 1989, Ebola was also discovered in the Philippines, after monkeys infected with the disease were exported from there to an animal testing laboratory in Reston, Virginia in the United States. "
    }
    {
      _id: '5'
      title: "Economic"
      content: "The affected countries have diverse economic profiles that generally center on the export of raw materials like iron ore, petroleum, and food products [<span class='link' data-y='5' data-x='0'>Guinea</span>, <span class='link' data-y='5' data-x='1'>Liberia</span>, <span class='link' data-y='5' data-x='2'>Sierra Leone</span>]. Many organizations, like the World Bank, are concerned about the <span class='link' data-y='5' data-x='3'>economic cost</span> this outbreak will have for countries in West Africa. Some of the responses, like closing borders, shutting down transportation, and ordering mandatory quarantines can disrupt normal economic activity and keep people from their jobs, which could potentially lead to economic collapse. "
    }
    {
      _id: '6'
      title: "Human Impact"
      content: "With a <span class='link' data-y='6' data-x='0'>growing number of lives claimed</span>, this disease has a tremendous impact on people’s lives. In many communities, the number of people infected by the disease <span class='link' data-y='6' data-x='1'>far exceeds the capacity of hospitals to treat them</span>. In some places, people do not believe that Ebola is the real cause of the deaths they are seeing, and are distrustful of hospitals. <span class='link' data-y='6' data-x='2'>Some citizen journalists also report</span> that families who experience ebola-related deaths face social stigma, which in turn causes them to avoid being tested at a hospital."
    }
  ].forEach (block) ->
    NarrativeBlocks.insert block


if (ContextBlocks.find().count() is 0)
  [
    {
      type: "map"
      url: "https://www.google.com/maps/embed/v1/place?q=West+Africa&key=AIzaSyB2zbIKIoJR0fq5-dmM_h88hDce9TRDz9Q"
      description: "West Africa region: Nigeria, Liberia, Sierra Leone, Guinea"
      _id: '0'
    }
    {
      type: "text"
      content: "From the Centers for Disease Control and Prevention: “On July 25, 2014, the Nigerian Ministry of Health confirmed that a man in Lagos, Nigeria, died from Ebola. The man had been in a Lagos hospital since arriving at the Lagos airport from Liberia. Currently, a small number of Ebola cases linked to this patient have been reported in Lagos and Port Harcourt. The Nigerian government has taken actions to contain further spread, but it is not yet known if these actions will be successful."
      _id: '1'
    }
    {
      type: "image"
      url: "2014_Ebola_virus_epidemic_in_West_Africa.png"
      description: "Situation map of the outbreak. Source: Wikipedia."
      _id: '2'
    }
    {
      type: "image"
      url: "Ebola_Virus.jpg"
      description: "Electron Micrograph image of Virus"
      _id: '3'
    }
    {
      type: "video"
      url: "//www.youtube.com/embed/aM3vhZrNa7E"
      description: "How did ebola evolve to affect humans?"
      _id: '4'
    }
    {
      type: "text"
      content: "Symptoms can progress to include vomiting, diarrhea, and external bleeding, which facilitate the spread of the disease. This can become especially problematic at funerals, as infected bodies can be a vector for disease."
      _id: '5'
    }
    {
      type: "image"
      url: "Ebola_Betten_Isolation.jpg"
      description: "Isolation Chamber"
      _id: '6'
    }
    {
      type: "image"
      url: "EbolaCycle.png"
      description: "Ebola Cycle"
      _id: '7'
    }
    {
      type: "image"
      url: "batsmonkeys.jpg"
      description: "Red Cross communications materials teach people how Ebola is transmitted. Tommy Trenchard / Al Jazeera"
      _id: '8'
    }
    {
      type: "video"
      url: "//www.youtube.com/embed/PlmHZeukdh0"
      description: "Sierra Leone Lockdown"
      _id: '9'
    }
    {
      type: "video"
      url: "//www.youtube.com/embed/KEmSpyYLXr0"
      description: "WHO response"
      _id: '10'
    }
    {
      type: "video"
      url: "//www.youtube.com/embed/uAVk2IJDEsM"
      description: "Obama response"
      _id: '11'
    }
    {
      type: "video"
      url: "//www.youtube.com/embed/oouvsHBeF_Q"
      description: "Global community"
      _id: '12'
    }
    {
      type: "text"
      content: "In July, two Americans who worked for an aid organization were infected with Ebola in Liberia. They were given an experimental treatment, known as ZMapp, and recovered. A Spanish missionary priest was also infected and treated similarly. ZMapp is an experimental drug that is not in production nor has it been tested in humans. Many bioethicists expressed outrage that Westerners were given the treatment and not Africans."
      _id: '13'
    }
    {
      type: "map"
      url: "https://www.google.com/maps/embed/v1/place?q=Central+Africa&key=AIzaSyB2zbIKIoJR0fq5-dmM_h88hDce9TRDz9Q"
      description: "Central Africa"
      _id: '14'
    }
    {
      type: "image"
      url: "cdc_doctor_discards.jpg"
      description: "A doctor wearing protective equipment discards blood specimens during the 1976 Ebola outbreak in Zaire, 1976. Source: CDC"
      _id: '15'
    }
    {
      type: "image"
      url: "ebola_isolation_chamber.jpg"
      description: "Ebola isolation chamber from the 1970s."
      _id: '16'
    }
    {
      type: "image"
      url: "nurses_1976.jpg"
      description: "Nurses treat patient in 1976 Ebola outbreak."
      _id: '17'
    }
    {
      type: "oec"
      url: "http://atlas.media.mit.edu/explore/embed/tree_map/hs/export/gin/all/show/2012/?controls=false&lang=en"
      description: "Products exported by Guinea (2012)"
      _id: '18'
    }
    {
      type: "oec"
      url: "http://atlas.media.mit.edu/explore/embed/tree_map/hs/export/lbr/all/show/2012/?controls=false&lang=en"
      description: "Products exported by Liberia (2012)"
      _id: '19'
    }
    {
      type: "oec"
      url: "http://atlas.media.mit.edu/explore/embed/tree_map/hs/export/sle/all/show/2012/?controls=false&lang=en"
      description: "Products exported by Sierra Leone (2012)"
      _id: '20'
    }
    {
      type: "video"
      url: "//www.youtube.com/embed/T3v64ZchRkM"
      description: "Economic Cost"
      _id: '21'
    }
    {
      type: "image"
      url: "Deceased_per_day_Ebola_2014.png"
      description: "Deaths/cases over time"
      _id: '22'
    }
    {
      type: "video"
      url: "//player.vimeo.com/video/106298449"
      description: "Dying of Ebola at the Hospital Door"
      _id: '23'
    }
    {
      type: "video"
      url: "//player.vimeo.com/video/103567250 "
      description: "Economic Cost"
      _id: '24'
    }
  ].forEach (block) ->
    ContextBlocks.insert block
