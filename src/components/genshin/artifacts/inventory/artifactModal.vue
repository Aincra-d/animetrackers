<template>
    <div>
        <ui-modal
        @close="restoreScroll"
        style="height:100vh;"
        alignTop
        :alignTopMargin="0"
        :max-height="100"
        title="Edit your artifact"
        ref="artifactModal"
        :class="modal_bg_class"
        class="text-light text-center anime-info-modal">
            <div
            class="w-100 text-center"
            style="/*{ backgroundImage: 'url(' + artifacts[0].info.piece.image + ')', backgroundSize: 'auto'}*/">
                <artifact
                :inventory="false"
                :editing="true"
                class="d-inline-block col-12"
                :artifact="current_artifact">
                </artifact>

                <button
                type="button"
                class="btn text-light d-inline rounded-0 mx-1"
                style="box-shadow: 0px 0px 10px black;text-shadow: 0px 0px 10px black;"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.level === current_artifact.info.max_level"
                @click="current_artifact.info.level!=current_artifact.info.max_level && upgrade()">
                    <i class="fas fa-arrow-up fa-sm"></i> Upgrade
                </button>

                <button
                type="button"
                class="btn text-light d-inline rounded-0 mx-1"
                style="box-shadow: 0px 0px 10px black;text-shadow: 0px 0px 10px black;"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="removed"
                @click="!removed != 0 && remove()">
                    <i class="fas fa-times fa-sm mr-1"></i>Remove
                </button>

                <button
                type="button"
                class="btn text-light d-inline rounded-0 mx-1"
                style="box-shadow: 0px 0px 10px black;text-shadow: 0px 0px 10px black;"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.rerolls.main.count != 0"
                @click="current_artifact.info.rerolls.main.count === 0 && rerollMainStat()">
                    <i class="fas fa-redo fa-sm mr-1"></i>Reroll main
                </button>

                <button
                type="button"
                class="btn text-light d-inline rounded-0 mx-1"
                style="box-shadow: 0px 0px 10px black;text-shadow: 0px 0px 10px black;"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                :disabled="current_artifact.info.rerolls.subs.count != 0"
                @click="current_artifact.info.rerolls.subs.count === 0 && rerollSubStats()">
                    <i class="fas fa-redo fa-sm mr-1"></i>Reroll subs
                </button>

                <!-- <b-dropdown
                id="dropdown-left"
                text="Reroll stats"
                :size="$root.screen < 576 ? 'sm' : 'md'"
                variant="dark"
                class="m-2">
                    <b-dropdown-item
                    @click="current_artifact.info.rerolls.main.count!=1 && rerollMainStat()"
                    :disabled="current_artifact.info.rerolls.main.count == 1"
                    href="#">
                        Main stat(max: 1)
                    </b-dropdown-item>

                    <b-dropdown-item
                    @click="current_artifact.info.rerolls.subs.count!=1 && rerollSubStats()"
                    :disabled="current_artifact.info.rerolls.subs.count == 1"
                    href="#">
                        Sub stats(max: 1)
                    </b-dropdown-item>
                </b-dropdown> -->
            </div>
        </ui-modal>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    export default{
        name: 'artifactModal',
        props: {
            artifacts: Array
        },
        data(){
            return {
                // artifacts: [],
                current_artifact: {},
                modal_bg_class: '',
                roll_counter: localStorage.roll_counter || 0,
                all_subs: [],
                main_stats: require('../mainstats.json'),
                sub_stats: require('../substats.json'),
                max_sub_counts: [1,2,4,4,4],
                removed: false
            }
        },
        components: {
            artifact
        },
        methods: {
            openModal(ref,id) {
                this.setSubs();
                // this.artifacts=JSON.parse(localStorage.artifacts).filter(artifact => artifact.id === id);
                this.artifact_id=id;
                this.current_artifact=JSON.parse(localStorage.artifacts).filter(artifact => artifact.id === id)[0];
                this.modal_bg_class='stars-'+this.artifacts[this.artifacts.findIndex(artifact => artifact.id === this.artifact_id)].info.stars;
                this.$refs[ref].open();
            },
            rerollMainStat(){
                let main_stats;
                let artifact=this.artifacts[this.artifacts.findIndex(artifact => artifact.id === this.artifact_id)];
                let old_main=artifact.stats.main.name;

                //SET MAIN STATS BASED ON THE TYPE OF THE ARTIFACT
                let piece=artifact.info.piece;

                switch (piece.type) {
                    case 'Flower of Life': main_stats=["HP"]; break;
                    case 'Plume of Death': main_stats=["ATK"]; break;
                    case 'Sands of Eon':
                    main_stats=["HP%","DEF%","Energy Recharge%","ATK%","Elemental Mastery"];
                    break;
                    case 'Goblet of Eonothem':
                    main_stats=["HP%","DEF%","ATK%","Elemental Mastery","Physical DMG Bonus","Geo DMG Bonus","Electro DMG Bonus","Pyro DMG Bonus","Cyro DMG Bonus","Hydro DMG Bonus","Anemo DMG Bonus"];
                    break;
                    case 'Circlet of Logos':
                    main_stats=["HP%","DEF%","ATK%","Elemental Mastery","CRIT Rate%","CRIT DMG%","Healing Bonus"];
                    break;
                }

                if(artifact.stats.subs.map(sub => sub.name).includes('CRIT DMG%')){
                    main_stats.splice(main_stats.findIndex(main => main == 'CRIT DMG%'),1);
                }
                if(artifact.stats.subs.map(sub => sub.name).includes('CRIT Rate%')){
                    main_stats.splice(main_stats.findIndex(main => main == 'CRIT Rate%'),1);
                }
                if(artifact.stats.subs.map(sub => sub.name).includes('Elemental Mastery')){
                    main_stats.splice(main_stats.findIndex(main => main == 'Elemental Mastery'),1);
                }
                if(artifact.stats.subs.map(sub => sub.name).includes('Energy Recharge%')){
                    main_stats.splice(main_stats.findIndex(main => main == 'Energy Recharge%'),1);
                }

                main_stats.splice(main_stats.findIndex(main => main == old_main),1);

                let stars=artifact.info.stars;
                let random_main=main_stats[Math.floor(Math.random() * main_stats.length)];

                artifact.stats.main={
                    name: random_main,
                    value: this.main_stats[stars-1].stats[random_main][artifact.info.level]

                };

                let new_main=artifact.stats.main.name;

                artifact.info.rerolls.main.count++;
                // artifact.info.rerolls.main.count++;
                this.current_artifact=artifact;
                this.updateInventory(artifact);

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Changed main stat from <u>'+old_main+'</u> to <u>'+new_main+'</u></h6>'
                });
            },
            rerollSubStats(){
                let artifact=this.artifacts[this.artifacts.findIndex(artifact => artifact.id === this.artifact_id)];
                let old_subs=artifact.stats.subs.map(sub => sub.name);

                artifact.stats.subs=[];
                artifact.info.level=0;
                artifact.stats.main.value=this.main_stats[artifact.info.stars-1].stats[artifact.stats.main.name][0]
                let subs=[];

                switch (artifact.stats.main.name) {
                    case 'Elemental Mastery':
                    this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'Elemental Mastery'),1);
                    break;

                    case 'CRIT DMG%':
                    this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'CRIT DMG%'),1);
                    break;

                    case 'CRIT Rate%':
                    this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'CRIT Rate%'),1);
                    break;

                    case 'Energy Recharge%':
                    this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'Energy Recharge%'),1);
                    break;
                }


                //SET THE NUMBER OF SUBSTATS
                let sub_rolls;

                switch (artifact.info.stars) {
                    case 5: sub_rolls=Math.random() < 0.2 ? 4 : 3; break;
                    case 4: sub_rolls=Math.random() < 0.4 ? 3 : 2; break;
                    case 3: sub_rolls=Math.random() < 0.8 ? 2 : 1; break;
                    case 2: sub_rolls=Math.random() < 0.9 ? 1 : 0; break;
                    case 1: sub_rolls=0; break;
                }

                //ROLL RANDOM SUBSTATS
                for(let i=0; i<sub_rolls; i++){
                    let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                    subs.push({
                        name: random_sub.name,
                        value: random_sub.values[artifact.info.stars][Math.floor(
                            Math.random() * random_sub.values[artifact.info.stars].length)],
                        level: 0
                    });
                    this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === random_sub.name),1);
                }

                artifact.info.rerolls.subs.count++;
                artifact.stats.subs=subs;
                this.current_artifact=artifact;
                this.sub_stats=this.all_subs;
                this.setSubs();
                this.updateInventory(artifact);

                let new_subs=artifact.stats.subs.map(sub => sub.name);

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Changed sub stats from <u>'+old_subs+'</u> to <u>'+new_subs+'</u></h6>'
                });
            },
            remove(){
                this.removed=false;
                let artifacts=JSON.parse(localStorage.artifacts);
                let inventory=this.artifacts;

                artifacts.splice(artifacts.findIndex(artifact => artifact.id === this.artifact_id),1);
                inventory.splice(inventory.findIndex(artifact => artifact.id === this.artifact_id),1);

                localStorage.setItem('artifacts',JSON.stringify(artifacts));

                this.removed=true;
                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Removed artifact from inventory!</h6>'
                });
            },
            upgrade(){
                let artifact=this.artifacts[this.artifacts.findIndex(artifact => artifact.id === this.artifact_id)];

                if(artifact.stats.subs.length === this.max_sub_counts[artifact.info.stars-1]){
                    if(artifact.info.level !== artifact.info.max_level){
                        let random_sub=artifact.stats.subs[Math.floor(Math.random() * artifact.stats.subs.length)];

                        let sub_values=this.sub_stats.filter(sub => sub.name === random_sub.name)[0].values[artifact.info.stars];

                        random_sub.value+=sub_values[Math.floor(Math.random() * sub_values.length)];
                        random_sub.level+=1;
                        artifact.info.level+=4;

                        artifact.stats.main.value=this.main_stats[artifact.info.stars-1].stats[artifact.stats.main.name][artifact.info.level]
                    }
                }
                else{
                    switch (artifact.stats.main.name) {
                        case 'Elemental Mastery':
                        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'Elemental Mastery'),1);
                        break;

                        case 'CRIT DMG%':
                        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'CRIT DMG%'),1);
                        break;

                        case 'CRIT Rate%':
                        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'CRIT Rate%'),1);
                        break;

                        case 'Energy Recharge%':
                        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === 'Energy Recharge%'),1);
                        break;
                    }

                    let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                    let isSubFree=artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0 ? true : false;

                    while(!isSubFree){
                        random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                        if(artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0)
                            isSubFree=true;
                    }

                    artifact.stats.subs.push({
                        name: random_sub.name,
                        value: random_sub.values[artifact.info.stars][Math.floor(
                            Math.random() * random_sub.values[artifact.info.stars].length)],
                        level: 0
                    });

                    artifact.info.level+=4;
                    artifact.stats.main.value=this.main_stats[artifact.info.stars-1].stats[artifact.stats.main.name][artifact.info.level]
                }

                this.current_artifact=artifact;

                this.updateInventory(artifact);
            },
            updateInventory(artifact){
                let artifacts=JSON.parse(localStorage.artifacts);
                artifacts[artifacts.findIndex(artifact => artifact.id === this.artifact_id)]=artifact;

                localStorage.setItem('artifacts',JSON.stringify(artifacts));
            },
            setSubs(){
                this.all_subs=[
                {
                    "name": "HP",
                    "values": {
                        "1": [24],
                        "2": [50,61,72],
                        "3": [100,115,129,143],
                        "4": [167,191,215,239],
                        "5": [209,239,269,299]
                    }
                },
                {
                    "name": "ATK",
                    "values": {
                        "1": [2],
                        "2": [3,4,5],
                        "3": [7,8,9],
                        "4": [11,12,14,16],
                        "5": [14,16,18,19]
                    }
                },
                {
                    "name": "DEF",
                    "values": {
                        "1": [2],
                        "2": [4,5,6],
                        "3": [8,9,10,11],
                        "4": [13,  15,  17,  19],
                        "5": [16,  19,  21,  23]
                    }
                },
                {
                    "name": "Elemental Mastery",
                    "values": {
                        "1": [6],
                        "2": [7,  8,  9],
                        "3": [10,  11,  13,  14],
                        "4": [13,  15,  17,  19],
                        "5": [16,  19,  21,  23]
                    }
                },
                {
                    "name": "HP%",
                    "values": {
                        "1": [1.2,  1.5],
                        "2": [1.6,  2,  2.3],
                        "3": [2.5,  2.8,  3.2,  3.5],
                        "4": [3.3,  3.7,  4.2,  4.7],
                        "5": [4.1,  4.7,  5.3,  5.8]
                    }
                },
                {
                    "name": "ATK%",
                    "values": {
                        "1": [1.2,  1.5],
                        "2": [1.6,  2,  2.3],
                        "3": [2.5,  2.8,  3.2,  3.5],
                        "4": [3.3,  3.7,  4.2,  4.7],
                        "5": [4.1,  4.7,  5.3,  5.8]
                    }
                },
                {
                    "name": "DEF%",
                    "values": {
                        "1": [1.8],
                        "2": [2,  2.5,  2.9],
                        "3": [3.1,  3.5,  3.8,  4.4],
                        "4": [4.1,  4.7,  5.3,  5.8],
                        "5": [5.1,  5.8,  6.6,  7.3]
                    }
                },
                {
                    "name": "Energy Recharge%",
                    "values": {
                        "1": [1.3,  1.6],
                        "2": [1.8,  2.2,  2.6],
                        "3": [2.7,  3.1,  3.5,  3.9],
                        "4": [3.6,  4.1,  4.7,  5.2],
                        "5": [4.5,  5.2,  5.8,  6.5]
                    }
                },
                {
                    "name": "CRIT Rate%",
                    "values": {
                        "1": [0.8,  1.6],
                        "2": [1.1,  1.3,  1.6],
                        "3": [1.6,  1.9,  2.1,  2.3],
                        "4": [2.2,  2.5,  2.8,  3.1],
                        "5": [2.7,  3.1,  3.5,  3.9]
                    }
                },
                {
                    "name": "CRIT DMG%",
                    "values": {
                        "1": [1.6],
                        "2": [2.2,  2.6,  3.1],
                        "3": [3.3,  3.7,  4.2,  4.7],
                        "4": [4.4,  5,  5.6,  6.2],
                        "5": [5.4,  6.2,  7,  7.8]
                    }
                }
            ];
            },
            restoreScroll(){
                document.getElementsByTagName('body')[0].style.overflowY = 'auto';
                // if(this.removed) this.$emit('update-inventory');
                // if(this.removed) this.updateInventory({},true)
                this.removed=false
            }
        }
    }
</script>

<style scoped>

</style>

<style>
    @media(max-width: 991px){
        .ui-modal__container{
            max-height: 80vh !important;
            overflow-y: auto;
        }
/*        .ui-modal__body{
            max-height: 80vh !important;
            overflow-y: auto;
        }*/
    }

    .ui-modal__body{
        background-image: attr(data-body-image);
        color:white;
        padding-left:0 !important;
        padding-right:0 !important;
    }

    .stars-5 .ui-modal__header,.stars-5 .ui-modal__body{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .stars-4 .ui-modal__header,.stars-4 .ui-modal__body{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .stars-3 .ui-modal__header,.stars-3 .ui-modal__body{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .stars-2 .ui-modal__header,.stars-2 .ui-modal__body{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .stars-1 .ui-modal__header,.stars-1 .ui-modal__body{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
</style>