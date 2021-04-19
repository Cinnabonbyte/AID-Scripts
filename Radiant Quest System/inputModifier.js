
// Checkout the repo examples to get an idea of other ways you can use scripting 
// https://github.com/latitudegames/Scripting/blob/master/examples

const modifier = (text) => {
  let modifiedText = text
  const lowered = text.toLowerCase()
  
  
  if(!state.setup){
    state.OnOff = true
    state.silent = false
    state.clearAN = false
    state.ANswitch = false
    state.clearOutput = false
    state.autoAccept = false
    state.autoDecline = false
    state.automaticresponses = true
    
    state.fixer = ""
    state.quest = ""
    state.loc = ""
    
    state.buffer = 0
    state.frequency = 1
    state.AN = ""
    
    state.noJob = "Current Job: None"
    state.currentjob = state.noJob
    
    state.hint = "FIXER"
    
    if(memory.includes("You are ")){
      state.namePart1 = memory.substring(memory.indexOf("You are ")+8)
      state.namePart2 = state.namePart1.substring(state.namePart1.indexOf(","))
      state.name = state.namePart1.replace(state.namePart2, "")
      console.log(state.name)
    }
    
    state.onJob = false
    state.choice = false
    
    state.hints = true
    state.msg = true


    updateMessage()
    state.setup = true
  }
  
  updateMemory()
  
  
  //ON OFF
  if(lowered.includes("/calls")){
    state.OnOff = !state.OnOff
    state.msg = false
    state.hud = "Phone Calls: "+state.OnOff
    state.clearOutput = true
    modifiedText = ""
  }
  
  
  //SILENT
  if(lowered.includes("/silent")){
    state.silent = !state.silent
    state.clearOutput = true
    modifiedText = ""
  }
  
  
  //RATE
  if(lowered.includes("/rate")){
    state.frequency = text.substring(text.indexOf("/")+6)
    if(state.frequency == 1){
      state.hint = "\nHint: The frequency has been set to 1 turn."
    }else if (state.frequency != 1){
      state.hint = "\nHint: The frequency has been set to "+state.frequency+" turns."
    }
    updateMessage()
    state.clearOutput = true
    modifiedText = ""
    console.log(state.percentage)
    console.log(state.hint)
  }
  
  if(lowered.includes("/fixer")){
    state.addFixer = text.substring(text.indexOf("/")+7)
    state.fixers.push(state.addFixer)
    state.fixersShort.push(state.addFixer)
    state.clearOutput = true
    modifiedText = ""
  }
  
  if(lowered.includes("/list")){
    state.clearOutput = true
    state.message = state.hud+"\nContacts: "+state.fixers.join(", ")
	  modifiedText = ""
  }
  
  //SHOW HIDE MESSAGE
  if(lowered.includes("/msg")){
    state.msg = !state.msg
    updateMessage()
    state.clearOutput = true
    modifiedText = ""
  }
  
  
  //SHOW HIDE HINTS
  if(lowered.includes("/hints")){
    state.hints = !state.hints
    updateMessage()
    state.clearOutput = true
    modifiedText = ""
  }
  
  
  //ACCEPT DECLINE
  if(state.choice == true){
    
    if(state.buffer > 0){
      state.buffer--
    }
    if(lowered.includes("/no")){
      
      if(state.frequency == 1){
        state.hint = "\nHint: A fixer should call in the next turn."
      }else if (state.frequency != 1){
        state.hint = "\nHint: A fixer should call in ~"+state.frequency+" turns."
      }
      state.onJob = false
      state.currentjob = state.noJob
      state.choice = false
      state.ANfunctionality = false
      state.AN = ""
      updateMessage()
      state.clearOutput = true
      modifiedText = ""
      
    }else if(lowered.includes("/yes")){
      state.hint = "\nHint: You accepted the job. To complete the job type: /end"
      state.onJob = true
      state.currentjob = "Current Job: "+state.quest+state.loc
      state.choice = false
      state.AN = "Author's Note: Current Job: "+state.questHUD+state.locHUD
      updateMessage()
      state.clearOutput = true
      modifiedText = ""
    }
  }else if(state.choice == false){
    if(lowered.includes("/no") || lowered.includes("/yes")){
    state.hint = "\nHint: There is no job to accept/decline."
    updateMessage()
    state.clearOutput = true
    modifiedText = ""
    console.log(state.hint)
    }  
  }
  
  
  
  //End Job
  
  if(state.onJob == true){
    if(lowered.includes("/end")){
      state.hint = "\nHint: You ended the job. To toggle hints, type: /hints"
      state.currentjob = state.noJob
      updateMessage()
      state.onJob = false
      state.clearOutput = true
      modifiedText = ""
    }
  }else if(state.onJob == false){
    if(lowered.includes("/end")){
      state.hint = "\nHint: You have no job to end."
      updateMessage()
      state.clearOutput = true
      modifiedText = ""
      console.log(state.hint)
    }
  }
  
  if(lowered.includes("/cmd")){
    state.message = "/calls                            Toggle The System On/Off\n/rate [TurnNumber]       Change the approximate number of turns it takes to get a call (e.g. /rate 60)\n/msg                             Toggle HUD\n/hints                            Toggle hints\n/fixer [FixerName]        Adds a fixer to your contact list (e.g. /fixer Dakota)\n/list                               Display your contact list\n/yes                              Accept a job         \n/no                               Decline a job       \n/end                             End a finished job"
    state.clearOutput = true
    modifiedText = ""
  }
  
  updateMemory()
  // You must return an object with the text property defined.
  return { text: modifiedText }
}

// Don't modify this part
modifier(text)
