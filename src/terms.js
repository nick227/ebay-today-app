let termsMini = ["pipe"];

let termsCameras = ['panasonic lumix gh4 body', 'panasonic lumix gh5 body', 'canon xc10 body', 'canon c100 camera', 'canon c200 camera', 'canon c300 camera', 'canon c500 camera', 'canon mark IV body', 'canon 80D body', 'canon M50 body', 'canon eos-1d x mark body', 'sony fs5 camera', 'sony fs7 camera', 'black magic cinema camera', 'black magic ursa mini camera', 'red dragon camera body', 'red camera digital cinema', 'Fujifilm X-T20 body', 'Fujifilm X-T3 body'];


let termsLenses = ["ef mount lens", "Parfocal Lens", "Cine lens", 'micro four thirds lens', 'SLR Magic lens', 'cinema prime lens'];


let termsLights = ["godox video light", 'video studio lighting', 'LED Video Light', 'fresnel light', 'Aputure video light', 'kino flo light', 'continuous output video light'];


let videoRecTerms = ['atomos ninja', 'atomos shogun', 'atomos recorder', 'blackmagic video monitor', 'smallhd monitor', '4k video recorder monitor', 'camera field monitor'];


let stablizersTerms = ['DJI Ronin', 'zhiyun gimbal stabilizer', 'weebill lab gimbal stabilizer', 'Movo gimbal stabilizer', 'FLYCAM Stabilizing Arm Video Vest', 'Wireless Motorized Camera Slider', 'Movo Steadycam System', 'Glidecam Professional Camera Stabilization System', 'motorized dslr camera slider'];


let termsAudio = ["rode microphone", 'sennheiser microphone', 'shotgun microphone', 'shure microphone', 'tascam recorder', 'zoom audio recorder'];


let termsvidCards = ["AMD Ryzen", "intel core i9", "EVGA GeForce RTX 2080", "AMD Radeon Pro", "video card gpu 16gb", "Intel Xeon processor cpu", "AMD Epyc processor cpu"];

let terms = {
    cameras: termsCameras,
    monitors: videoRecTerms,
    stabilizers: stablizersTerms,
    lenses: termsLenses,
    lights: termsLights,
    audio: termsAudio,
    workstation: termsvidCards,
    test: termsMini
};

module.exports = terms;