const GRAMMAR_SCENES = [
  {noun:'puppy',verbs:['runs','jumps'],adjectives:['playful','small','brown'],adverbs:['happily','quickly']},
  {noun:'kitten',verbs:['sleeps','stretches'],adjectives:['sleepy','tiny','fluffy'],adverbs:['peacefully','slowly']},
  {noun:'bird',verbs:['sings','flies'],adjectives:['bright','little','blue'],adverbs:['sweetly','gracefully']},
  {noun:'rabbit',verbs:['hops','hides'],adjectives:['white','shy','soft'],adverbs:['quickly','quietly']},
  {noun:'horse',verbs:['trots','runs'],adjectives:['strong','gentle','tall'],adverbs:['proudly','swiftly']},
  {noun:'frog',verbs:['jumps','croaks'],adjectives:['green','little','spotted'],adverbs:['loudly','suddenly']},
  {noun:'child',verbs:['laughs','waves'],adjectives:['cheerful','kind','young'],adverbs:['happily','excitedly']},
  {noun:'teacher',verbs:['speaks','smiles'],adjectives:['kind','patient','friendly'],adverbs:['gently','warmly']},
  {noun:'robot',verbs:['walks','waves'],adjectives:['shiny','clever','small'],adverbs:['slowly','cheerfully']},
  {noun:'turtle',verbs:['walks','rests'],adjectives:['slow','green','little'],adverbs:['quietly','peacefully']},
  {noun:'butterfly',verbs:['flies','lands'],adjectives:['colorful','delicate','yellow'],adverbs:['gracefully','softly']},
  {noun:'fox',verbs:['runs','hides'],adjectives:['clever','red','young'],adverbs:['quickly','quietly']},
  {noun:'squirrel',verbs:['climbs','jumps'],adjectives:['busy','small','furry'],adverbs:['quickly','eagerly']},
  {noun:'dancer',verbs:['spins','moves'],adjectives:['graceful','talented','young'],adverbs:['smoothly','happily']},
  {noun:'singer',verbs:['sings','smiles'],adjectives:['brave','cheerful','young'],adverbs:['loudly','proudly']},
  {noun:'farmer',verbs:['works','waves'],adjectives:['busy','kind','strong'],adverbs:['carefully','happily']}
];
function grammarConfig(profile){return {length:10,level:profile.id==='three'?'growing':'starter',...(profile.grammar||{})}}
// Keep the part of speech on each word so the same sentences can support
// other find-the-word activities later. Sentence patterns are cycled in a
// shuffled order so an entire round cannot put the answer in one position.
const GRAMMAR_PATTERNS = [
  (n,a,v,d)=>[['The','determiner'],[a,'adjective'],[n,'noun'],[v,'verb'],[d,'adverb']],
  (n,a)=>[['That','determiner'],[n,'noun'],['is','verb'],[a,'adjective']],
  (n,a,v,d)=>[['Today,','adverb'],['the','determiner'],[n,'noun'],[v,'verb'],[d,'adverb'],['and','conjunction'],['looks','verb'],[a,'adjective']],
  (n,a)=>[['Look','verb'],['at','preposition'],['the','determiner'],[a,'adjective'],[n,'noun']],
  (n,a)=>[['The','determiner'],[n,'noun'],['looks','verb'],[a,'adjective'],['today','adverb']],
  (n,a)=>[['I','pronoun'],['see','verb'],['a','determiner'],[a,'adjective'],[n,'noun']],
  (n,a)=>[['A','determiner'],[n,'noun'],['can','verb'],['be','verb'],[a,'adjective']]
];
function grammarRound(config, previousKeys=new Set(), random=Math.random){
  const scenes=config.level==='starter'?GRAMMAR_SCENES.slice(0,10):GRAMMAR_SCENES;
  const length=config.length===15?15:10, used=new Set(), result=[];
  const pick=items=>items[Math.floor(random()*items.length)];
  let patterns=[];
  function nextPattern(){
    if(!patterns.length){patterns=GRAMMAR_PATTERNS.map((_,i)=>i);for(let j=patterns.length-1;j>0;j--){let k=Math.floor(random()*(j+1));[patterns[j],patterns[k]]=[patterns[k],patterns[j]]}}
    return GRAMMAR_PATTERNS[patterns.pop()];
  }
  for(let i=0;i<length;i++){
    let scene,adjective,verb,adverb,key;
    for(let attempt=0;attempt<150;attempt++){
      scene=pick(scenes);adjective=pick(scene.adjectives);verb=pick(scene.verbs);adverb=pick(scene.adverbs);
      key=[scene.noun,adjective,verb,adverb].join(':');
      if(!used.has(key)&&!previousKeys.has(key))break;
    }
    if(used.has(key)||previousKeys.has(key)){
      // The scene bank has far more combinations than a round needs.
      for(const candidate of scenes){
        for(const adj of candidate.adjectives){
          for(const v of candidate.verbs){
            for(const adv of candidate.adverbs){
              const candidateKey=[candidate.noun,adj,v,adv].join(':');
              if(!used.has(candidateKey)&&!previousKeys.has(candidateKey)){
                scene=candidate;adjective=adj;verb=v;adverb=adv;key=candidateKey;break;
              }
            }
            if(!used.has(key)&&!previousKeys.has(key))break;
          }
          if(!used.has(key)&&!previousKeys.has(key))break;
        }
        if(!used.has(key)&&!previousKeys.has(key))break;
      }
    }
    used.add(key);
    result.push({key,tokens:nextPattern()(scene.noun,adjective,verb,adverb).map(([text,part])=>({text,part}))});
  }
  return result;
}
if(typeof module!=='undefined')module.exports={GRAMMAR_SCENES,GRAMMAR_PATTERNS,grammarConfig,grammarRound};
