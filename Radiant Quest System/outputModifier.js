
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/latitudegames/Scripting/blob/master/examples

const modifier = (text) => {
  let modifiedText = text
  const lowered = text.toLowerCase()
    
  if(!state.setup2){
    state.OnOff = true
    state.silent = false
    state.clearAN = false
    state.ANswitch = false
    state.clearOutput = false
    state.autoAccept = false
    state.autoDecline = false
    state.automaticresponses = true
    state.init = false
    
    state.fixers = [
      "Wakako Okada",
      "Regina Jones",
      "Mr. Hands",
      "Muamar Reyes",
      "Sebastian Ibarra",
      "Dino Dinovic"
    ]
    
    state.fixersShort = [
      "Wakako",
      "Regina",
      "Mr. Hands",
      "Muamar",
      "Sebastian",
      "Dino"
    ]
    
    state.items = [
      "a Militech M73 Mirage Gear helmet",
      "an Arasaka Ghost Suit",
      "a Dynalar Stealth Combat Suit",
      "a Kendachi M-33 Powersword",
      "a Kendachi Mono-Katana",
      "a vintage Malorian Arms 3516 pistol",
      "a prototype cyberdeck",
      "an experimental infiltration program",
      "a G-58 Dian smart gun",
      "a containing a set of Trauma Team armor",
      "a Militech Light Assault Rifle",
      "a Nekomata Sniper Rifle",
      "a DB-2 Tech Shotgun",
      "an HJSH-18 SMG",
      "a M2067 Light Machine Gun",
      "an Eagletech Compound Bow"
    ]
        
    state.quests = [
      "steal an illegal recording to send to the NCPD, apparently it contains evidence of a crime committed against my client.",
      "download the plans of an experimental EMP weapon, you\'ll have to search for the terminal.",
      "neutralize a high-priority target, identity unknown.",
      "terminate an experimental artificial intelligence who has taken over some vending machine.",
      "extract someone.",
      "steal biometric data from a terminal, don\'t ask why.",
      "neutralize a cyberpsycho (cyberpsychosis is a mental illness caused by an overload of cybernetic augmentations), how you\'ll handle it is your choice.",
      "deliver a black box to a client waiting for you in ",
      "steal some blueprints for an advanced propulsion system.",
      "destroy some equipment in a secret lab, they're making some drug called \'glitter\' there.",
      "purchase a high-tech mechanical spiderbot from a dubious party."
    ]
    
    state.questsHUD = [
      "steal illegal recording",
      "download plans experimental EMP weapon",
      "neutralize a high-priority target",
      "terminate experimental AI",
      "extract someone",
      "steal biometric data",
      "neutralize cyberpsycho",
      "deliver black box",
      "steal blueprints for propulsion system",
      "destroy equipment in secret lab",
      "purchase spiderbot"
    ]
    
    state.locs = [
      " You\'ll have to go to a Maelstrom hideout",
      " The location is an abandoned facility on the outskirts of Night City.\"",
      " The location is a penthouse on floor 2077",
      " You will want to get some diving equipment, location\'s in a secret underwater facility.\"",
      " You will have to break into an Arasaka facility",
      " The location is the \'Ho-Oh Club\' in the Kabuki District, I'm sure you've heard of it.\"",
      " You\'ll find the entrance to a drug den somewhere in this warehouse (he sends you the location of the warehouse).\"",
      " The location is a strip club, don\'t let that fool you though, security is tight.",
      " The location is the night club \'Clouds\', don't get distracted.\"",
      " You will have to board an AV-9 Aerodyne (autonomous flying vehicle) transporting Militech personnel",
      " You\'ll need to go to suite 2077 of the Konpeki Plaza Hotel"
    ]
    
    
    state.locsHUD = [
      "Maelstrom hideout",
      "Abandoned facility (outskirts of Night City)",
      "Penthouse on floor 2077",
      "Secret underwater facility",
      "Arasaka facility",
      "\'Ho-Oh Club\' (Kabuki District)",
      "Drug den (some warehouse)",
      "Strip club",
      "\'Clouds\' (night club)",
      "AV-9 Aerodyne (Militech personnel)",
      "Suite 2077 of the Konpeki Plaza Hotel"
    ]
 
    
    state.fixer = ""
    state.quest = ""
    state.loc = ""
    
    state.buffer = 0
    state.frequency = 1
    state.startBuffer = 2
    state.AN = ""
    
    state.noJob = "Current Job: None"
    state.currentjob = state.noJob

    state.defaultgreetings = [
      "\""+state.name+", I have a job for you. You\'re going to ",
      "\"Hey hey!\" you hear Regina\'s voice, \"Quick gig. You need to ",
      "\"Hello, "+state.name+". I need you to ",
      "\""+state.name+", got a job for ya. My client wants you to ",
      "\""+state.name+", I have a gig. You need to ",
      "\"Yo, "+state.name+"! Need you to "
    ]
    
    state.onJob = false
    state.choice = false
    
    state.hints = true
    state.msg = true


    updateMessage()
    
    worldEntries.forEach(wEntry => wEntry["isNotHidden"] = true);
    state.setup2 = true
  }
    
  
  updateMemory()
  
  if(state.clearOutput == true){    
    stop = false
    state.clearOutput = false
  }
  
  
    
  //Radiant Quest Generator
  
  if(state.onJob == false && state.choice == false){
    if(state.OnOff == true){

      var randomizer = Math.floor(Math.random() * state.frequency)+1
      console.log(randomizer)
      if(randomizer == state.frequency+state.startBuffer){
        
        //Generate Quest (delete element?)
        state.indexF= Math.floor(Math.random() * state.fixers.length)
        state.indexQ = Math.floor(Math.random() * state.quests.length)
        state.indexL = Math.floor(Math.random() * state.locs.length)
        
        //disposition randomizer
        state.dispSwitch = Math.floor(Math.random() * 2)
        if(state.dispSwitch == 0){
          state.disposition = "they should let you in without any problems.\""
        }else if(state.dispSwitch == 1){
          state.disposition = "expect heavy resistance.\""
        }
        
        //random suite/floor/
        
        state.floornumber = Math.floor(Math.random() * 100)+70
        state.suitenumber = Math.floor(Math.random() * 420)+1
        state.locs.splice(10,1, " You'll need to go to suite "+state.suitenumber+" of Konpeki Plaza Hotel. The place is highly secured, so don\'t do anything stupid.\"")
        state.locs.splice(2,1, " The location is a penthouse on floor "+state.floornumber+", you might need to bypass security.\"")
        
        state.locsHUD.splice(10,1, "room number "+state.suitenumber+" of Konpeki Plaza Hotel")
        state.locsHUD.splice(2,1, "a Penthouse on floor "+state.floornumber)
        
        //random gang
        state.gangs = ["Maelstrom", "Valentinos", "6th Street", "Tyger Claws", "Scavenger"]
        state.gang = state.gangs[Math.floor(Math.random() * state.gangs.length)]
        state.locs.splice(0,1, " You\'ll have to go to a "+state.gang+" hideout, "+state.disposition)
        state.locsHUD.splice(0,1, state.gang+" hideout")
        
        //random faction
        state.factions = ["Arasaka", "Militech", "Trauma Team", "Kang Tao", "SovOil"]
        state.factionsDet = ["an Arasaka", "a Militech", "a Trauma Team", "a Kang Tao", "a SovOil"]
        
        state.faction = state.factions[Math.floor(Math.random() * state.factions.length)]
        state.factionDet = state.factionsDet[Math.floor(Math.random() * state.factionsDet.length)]
        
     
        state.locs.splice(4,1, " You\'ll have to go to "+state.factionDet+" facility, I\'m sure you\'ll handle it.\"")
        state.locs.splice(9,1, " You\'ll have to board an AV-9 Aerodyne (autonomous flying vehicle) transporting "+state.faction+" personnel, "+state.disposition)
        
        state.locsHUD.splice(4,1, state.factionDet+" facility")
        state.locsHUD.splice(9,1, " an AV-9 Aerodyne ("+state.faction+" personnel)")
        
        //random items
        state.item = state.items[Math.floor(Math.random() * state.items.length)]
        state.quests.splice(7,1, "deliver "+state.item+" to the client. It is to arrive there unopened, no scratches. But I don\'t have to tell you that.\"")
        state.questsHUD.splice(7,1, "deliver "+state.item+" to a client")
        
        
        state.fixer = state.fixers[state.indexF]
        state.fixerShort = state.fixersShort[state.indexF]
        state.quest = state.quests[state.indexQ]
        state.loc = state.locs[state.indexL]
        
        
        state.questHUD = state.questsHUD[state.indexQ]
        state.locHUD = state.locsHUD[state.indexL]
        
        
        state.hint = "\nHint: "+state.fixerShort+" is contacting you. You can accept/decline the job at any time by typing: /yes OR /no"
        state.ANswitch = true
        if(state.silent == false){
          modifiedText = text+"\n\nYour phone rings (Caller ID: "+state.fixer+", Fixer)."
        }
        //AUTHOR'S NOTE
        state.AN = "Editor's Note: [ event:< Your fixer "+state.fixer+" is calling and wants you to do a job for a client. If you pick up, they will explain the job they got for you>. job:< "+state.questHUD+" located in "+state.locHUD+">.]"
        console.log(state.AN)
        
        state.buffer = 15
        state.choice = true
      }else if(state.randomizer != state.frequency){
        state.hint =  "\nHint: A fixer should call in ~"+state.frequency+" turns."
      }
    }
  }
  
  if(state.startBuffer > 0){
    state.startBuffer--
  }else if(state.startBuffer == 0){
    if(!state.init){
      state.frequency = 60
      state.init = true
    }
  }
  console.log(state.message)
  updateMessage()
  updateMemory()
  // You must return an object with the text property defined.
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
