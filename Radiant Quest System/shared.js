// Any functions you define here will be available in your other modifier scripts.

function bringJoy(string) {
  return string.replace(/\b(sad|angry)\b/g, 'happy')
}


function updateMessage() {
  //HUD text
  
  if(state.setup2 == true){
    state.questHUD = state.questsHUD[state.indexQ]
    state.locHUD = state.locsHUD[state.indexL]
  }
  
  
  
  if(state.hints == false){
    
    if(state.choice == false && state.onJob == false){
      state.hud = ""
    }else if(state.onJob == true && state.choice == false){
      state.hud = "Gig: "+state.questHUD+" |  Loc: "+state.locHUD
    }
    
  }else if(state.hints == true){
    
    
    if(state.onJob == true){
      state.hud = "Gig: "+state.questHUD+" |  Loc: "+state.locHUD+state.hint
    }else state.hud = state.hint
    
  }
  
  
  
  if(state.msg == false){
    state.message = ""
  }else if (state.msg == true){
    state.message = state.hud
  }
}


function updateMemory(){
  //update memory
  if(memory.includes("[") && memory.includes("]")){
    state.memPart1 = memory.substring(0,memory.lastIndexOf("["))
    state.memPart2 = memory.substring(memory.indexOf("]")+1)
    state.memory0 = state.memPart1+state.memPart2
    state.memory = {context: state.memPart1+state.currentjob+state.memPart2}
  }else {
    state.currentjobMemory = ""
    state.memory = {context: memory}
  }
}
