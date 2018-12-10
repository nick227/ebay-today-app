
let termsMini = ["canon mark IV"];

let termsBody    = ['canon mark IV body', 'Canon 70d body', 'canon D60 body', 'canon eos 6d II body', 'canon 80D body', 'nikon Nikon D810 body', 'Pentax K-1 Mark II body', 'canon M50 body', 'canon 5D body', 'canon eos-1d x mark body', 'canon rebel t6 body', 'olympus om-d e-m10 body', 'Fujifilm X-T20 body', 'panasonic lumix gh5 body', 'panasonic lumix gh4 body', 'sony a7iii body', 'sony alpha camera body'];
let termsCameras = {termsBody};

let termsLenses1  = ["canon ef lens", 'micro four thirds lens', 'Sigma lens', 'olympus lens', 'lens voigtlander'];
let termsLenses2  = ['cine camera lens', 'zoom camera lens', 'vintage camera lens', 'prime camera lens'];
let termsLenses  = {termsLenses1, termsLenses2};


let termsLights1  = ["godox flash", 'speedlite flash', 'Yongnuo', 'Wireless Flash'];
let termsLights2  = ['fresnel lighting', 'video led lighting', 'photography backdrops', 'studio flash photography', 'stage lighting'];
let termsLights  = {termsLights1, termsLights2};

let termsGear1   = ['manfrotto', 'DJI Ronin', 'Vanguard tripod', 'gimbal stabilizer', 'tripod', 'monopod', 'camera crane', 'camera slider', 'professional video'];
let termsGear    = {termsGear1};

let termsAu1    = ["rode microphone", 'lavalier mic', 'shotgun microphone', 'professional microphone'];
let termsAu2   = ['tascam', 'zoom audio', 'digital audio recorder', 'headphones'];
let termsAudio    = {termsAu1, termsAu2};


let termsShoe1 = ["addidas", "nike", "onitsuka shoe", "converse shoe", "puma shoe", "vans shoes", "air jordans", "Bacco Bucci", "Designer Mens shoe", "allen edmonds shoe", "bruno magli shoe", "lululemon shoe", "limited shoes"];
let termsShoes = {termsShoe1};

let termsOther = ["snowboard"];
let termsOthers = {termsOther};

let termsWatch1 = ["timex", "rolex", "movado watch", "seiko watch", "smartwatch", "quartz stainless watch", "fossil watch", "BREITLING watch","armani watch",  "skagen watch", "tag monaco watch", "Panerai Luminor Due", "MONDAINE HELVETICA", "limited luxury watch", "cartier mens watch", "montblanc watch", "Vacheron Constantin", "mens diamond watch", "tag heuer watch"];

let termsBook = ["graphic novel book", "signed copy book", "first print book", "collectors edition book", "vintage book"];
let termsBooks = {termsBook};

termsWatches = {termsWatch1};

let terms = {
	cameras: termsCameras,
	lenses: termsLenses,
	lights: termsLights,
	audio: termsAudio,
	books: termsBooks,
	gear: termsGear,
	shoes: termsShoes,
	watches: termsWatches,
	other:termsOthers
};

module.exports = terms;