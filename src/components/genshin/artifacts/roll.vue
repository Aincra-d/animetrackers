<template>
    <div>
        <div
        class="artifact-actions text-center my-2">
            <b-form-checkbox
            class="text-light mb-3 include-low-stars"
            v-model="include_low_stars"
            size="lg">
                Include 1-3 <i class="fas fa-star fa-xs"></i> artifacts
            </b-form-checkbox>

            <button
            v-if="artifacts.length === 0"
            @click="rollArtifact(false)"
            class="btn btn-primary d-inline mx-1 rounded-0"
            :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'">
                <i class="fas fa-redo fa-sm mr-1"></i> Roll artifact
            </button>

            <div
            v-else
            class="mb-3">
                <!-- <button
                v-if="artifacts.length!=0"
                :disabled="current_artifact.info.rerolls.subs.count == 1"
                type="button"
                class="btn btn-dark d-inline rounded-0 btn-md mx-1"
                @click="current_artifact.info.rerolls.subs.count!=1 && rerollSubStats()">
                    <i class="fas fa-arrow-up fa-sm"></i> Reroll subs
                </button> -->

                <button
                v-if="artifacts.length!=0"
                type="button"
                class="btn btn-info d-inline rounded-0 mx-1"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                @click="current_artifact.info.level!=current_artifact.info.max_level && upgrade()">
                    <i class="fas fa-arrow-up fa-sm"></i> Upgrade
                </button>

                <button
                type="button"
                class="btn btn-primary d-inline rounded-0 mx-1"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                @click="rollArtifact(false)">
                    <i class="fas fa-redo fa-sm mr-1"></i> Reroll
                </button>

                <button
                type="button"
                class="btn btn-success d-inline rounded-0 mx-1"
                :class="$root.screen < 576 ? 'btn-sm' : 'btn-md'"
                @click="add()">
                    <i class="fas fa-plus fa-sm mr-1"></i>Add
                </button>

                <b-dropdown
                v-if="artifacts.length!=0"
                id="dropdown-left"
                text="Reroll stats"
                :size="$root.screen < 576 ? 'sm' : 'md'"
                variant="info"
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
                </b-dropdown>
            </div>
        </div>

        <div>
            <!-- <div class="d-inline-block text-right w-50">
                <ui-select
                class="mt-1 mb-2 pt-1 px-1"
                placeholder="Desired substats"
                :options="sub_stat_names"
                multiple
                v-model="desired_subs">
                </ui-select>
            </div> -->

            <artifact
            :key="artifact.id"
            v-for="artifact in artifacts"
            :desired_subs="desired_subs"
            :artifact="artifact">
            </artifact>

            <div class="d-inline text-center w-100">
                <ui-select
                class="mt-1 mb-2 ml-3 select pt-1 px-1"
                placeholder="Select domain"
                :options="domain_names"
                v-model="selected_domain">
                </ui-select>

                <!-- <vs-select
                class="d-inline-block"
                placeholder="Select aritfact domain"
                state="light"
                v-model="selected_domain">
                    <vs-option
                    :key="i"
                    v-for="(domain_name,i) in domain_names"
                    :label="domain_name"
                    :value="domain_name">
                        {{domain_name}}
                    </vs-option>
                </vs-select> -->

                <button
                @click="selected_domain=''"
                type="button"
                class="btn btn-danger d-inline-block text-light btn-sm mb-2 ml-1 pt-1 pb-1 rounded">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <h5 class="text-light roll-counter">
                Number of rolls: {{ roll_counter }}
            </h5>
        </div>
    </div>
</template>

<script>
    import artifact from '@/components/genshin/artifacts/artifact.vue';
    import { uuid } from 'vue-uuid';
    export default{
        name: 'roll',
        components: {
            artifact
        },
        data(){
            return {
                artifacts: [],
                current_artifact: {},
                roll_counter: localStorage.roll_counter || 0,
                all_subs: [],
                sub_stats: require('../artifacts/substats.json'),
                domains: require('../artifacts/domains.json'),
                main_stats: require('../artifacts/mainstats.json'),
                sub_stat_names: require('../artifacts/substats.json').map(sub => sub.name),
                domain_names: require('../artifacts/domains.json').map(domain => domain.name),
                desired_subs: [],
                selected_domain: '',
                max_sub_counts: [1,2,4,4,4],
                include_low_stars: true
                // roll_count: 0
            }
        },
        methods: {
            clear(){
                this.artifacts=[];
                // this.roll_count=0;
            },
            rollArtifact(gold_roll){
                this.artifacts=[];
                this.sub_stats=this.all_subs;
                this.setSubs();
                let sets = require('../artifacts/sets.json');

                if(!this.include_low_stars) sets=sets.filter(set => set.stars.includes(5));

                if(this.selected_domain !== ""){
                    let domain_sets=this.domains.filter(domain => domain.name === this.selected_domain)[0].sets;

                    sets=sets.filter(set => domain_sets.includes(set.name));
                    // console.log(sets.map(set => set.name))
                }
                let main_stats;

                //SET MAIN STATS BASED ON THE TYPE OF THE ARTIFACT
                let set=sets[Math.floor(Math.random() * sets.length)];
                let piece=set.pieces[Math.floor(Math.random() * set.pieces.length)];
                let subs=[];

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

                let stars=set.stars[Math.floor(Math.random() * set.stars.length)];
                let random_main=main_stats[Math.floor(Math.random() * main_stats.length)];

                let main={
                    name: random_main,
                    value: this.main_stats[stars-1].stats[random_main][0]

                };

                switch (main.name) {
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

                switch (stars) {
                    case 5: sub_rolls=Math.random() < 0.2 ? 4 : 3; break;
                    case 4: sub_rolls=Math.random() < 0.4 ? 3 : 2; break;
                    case 3: sub_rolls=Math.random() < 0.8 ? 2 : 1; break;
                    case 2: sub_rolls=Math.random() < 0.9 ? 1 : 0; break;
                    case 1: sub_rolls=0; break;
                }

                //ROLL RANDOM SUBSTATS
                if(gold_roll){
                    let perfect=false;

                    while(!perfect){
                        for(let i=0; i<sub_rolls; i++){
                            let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                            subs.push({
                                name: random_sub.name,
                                value: random_sub.values[stars][Math.floor(
                                    Math.random() * random_sub.values[stars].length)],
                                level: 0
                            });
                            // this.sub_stats=this.sub_stats.filter(sub => sub.name != random_sub.name);
                            this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === random_sub.name),1);
                        }

                        let rolled_subs=subs.map(sub => sub.name);

                        if(rolled_subs.includes('ATK') &&
                        rolled_subs.includes('ATK%') &&
                        rolled_subs.includes('CRIT Rate%') &&
                        rolled_subs.includes('CRIT DMG%')){
                            perfect=true;
                        }
                        else{
                            subs=[];
                            rolled_subs=[];
                            this.setSubs();
                        }
                    }
                }
                else{
                    for(let i=0; i<sub_rolls; i++){
                        let random_sub=this.sub_stats[Math.floor(Math.random() * this.sub_stats.length)];

                        subs.push({
                            name: random_sub.name,
                            value: random_sub.values[stars][Math.floor(
                                Math.random() * random_sub.values[stars].length)],
                            level: 0
                        });
                        // this.sub_stats=this.sub_stats.filter(sub => sub.name != random_sub.name);
                        this.sub_stats.splice(this.sub_stats.findIndex(sub => sub.name === random_sub.name),1);
                    }
                }

                let rerolls={
                    main: {
                        count: 0
                    },
                    subs: {
                        count: 0
                    }
                }

                //CREATE ARTIFACT OBJECT
                let artifact={
                    id: uuid.v1(),
                    stats: {
                        main: main,
                        subs: subs,
                    },
                    info: {
                        'set': set,
                        piece: piece,
                        stars: stars,
                        level: 0,
                        max_level: stars*4,
                        rerolls: rerolls
                    }
                    // rolls: 1
                };

                let counter=localStorage.roll_counter || 0;
                counter++;

                localStorage.setItem('roll_counter', counter);
                this.roll_counter++;
                this.artifacts.push(artifact);
                this.sub_stats=this.all_subs;
                this.setSubs();
                this.current_artifact=artifact;
            },
            add(){
                if(localStorage.artifacts){
                    let artifacts=JSON.parse(localStorage.artifacts);

                    artifacts.push(this.current_artifact);
                    localStorage.setItem('artifacts',JSON.stringify(artifacts));
                }
                else{
                    localStorage.setItem('artifacts',JSON.stringify(this.artifacts));
                }

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Added artifact to inventory!</h6>'
                });

                this.$emit('update-inventory');

                this.rollArtifact();
            },
            rerollMainStat(){
                let main_stats;
                let artifact=this.current_artifact;

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

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Changed main stat from <u>'+old_main+'</u> to <u>'+new_main+'</u></h6>'
                });
            },
            rerollSubStats(){
                let artifact=this.current_artifact;
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

                let new_subs=artifact.stats.subs.map(sub => sub.name);

                this.$notify({
                    group: 'foo',
                    type: 'success',
                    title: '<h6>Changed sub stats from <u>'+old_subs+'</u> to <u>'+new_subs+'</u></h6>'
                });
            },
            upgrade(){
                let artifact=this.current_artifact;

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
            // perfectRoll(){
            //     let perfect=true;
            //     if(random_subs.includes('ATK') &&
            //         random_subs.includes('ATK%') &&
            //         random_subs.includes('CRIT Rate%') &&
            //         random_subs.includes('CRIT DMG%')){
            //             perfect=true;
            //     }

            //     while(!perfect){
            //         this.singleRoll();
            //     }
            // }
            // perfectRoll(){
            //     let sub_stats=['ATK%','ATK','HP%','HP','DEF%','DEF','EM','CR','CD','Energy Recharge'];
            //     const main_stats=['ATK%','HP%','DEF%','EM','CR','CD','Energy Recharge','Physical DMG Bonus','Geo DMG Bonus','Electro DMG Bonus','Pyro DMG Bonus','Cyro DMG Bonus','Hydro DMG Bonus','Anemo DMG Bonus'];
            //     // let sets=[];
            //     // let artifacts=[];

            //     let random_main=main_stats[Math.floor(Math.random() * main_stats.length)];
            //     let random_subs=[];
            //     let rolls=0;
            //     let perfect=false;

            //     while(!perfect){
            //         for(let i=0; i<4; i++){
            //             let random_sub=sub_stats[Math.floor(Math.random() * sub_stats.length)];
            //             random_subs.push(random_sub);

            //             let index = sub_stats.indexOf(random_sub);
            //             if (index !== -1) {
            //                 sub_stats.splice(index, 1);
            //             }
            //         }

            //         rolls++;



            //         if(random_subs.includes('ATK') &&
            //         random_subs.includes('ATK%') &&
            //         random_subs.includes('CR') &&
            //         random_subs.includes('CD')){
            //             perfect=true;
            //         }
            //         else{
            //             random_subs=[];
            //             sub_stats=['ATK%','ATK','HP%','HP','DEF%','DEF','EM','CR','CD','Energy Recharge'];
            //         }
            //     }



            //     let artifact={
            //         main_stat: random_main,
            //         sub_stats: random_subs,
            //         rolls: rolls
            //     };

            //     this.artifacts.push(artifact);
            //     sub_stats=['ATK%','ATK','HP%','HP','DEF%','DEF','EM','CR','CD','Energy Recharge'];
            // }
        },
        created(){
            this.setSubs();
        }
    }
</script>

<style scoped>
    .artifact{
        /*max-height: 400px;*/
        overflow-y: auto;
    }

    @media(min-width: 1200px){
        .artifact{
            max-width: 350px;
        }
    }

    .artifact.stars-5 .set-name{
        background-color: #be6c32;
    }

    .artifact.stars-4 .set-name{
        background-color: #a256e1;
    }

    .artifact.stars-3 .set-name{
        background-color: #5180cc;
    }

    .artifact.stars-2 .set-name{
        background-color: #288f72;
    }

    .artifact.stars-1 .set-name{
        background-color: #72778b;
    }

    .set-name{
        padding: 1.5px;
    }

    .set-name h5, .artifact-type{
        color: #f7f1e5;
    }

    .artifact.stars-5 .artifact-main-info{
        background: #dca451;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #7c5b52,#ac7b53, #dca451);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #7c5b52,#ac7b53, #dca451); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-4 .artifact-main-info{
        background: #a17bb9;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #675b8f,#675b8f, #a17bb9);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #675b8f,#675b8f, #a17bb9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-3 .artifact-main-info{
        background: #5599af;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #51597a,#517d97, #5599af);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #51597a,#517d97, #5599af); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-2 .artifact-main-info{
        background: #609674;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #496162,#48736a, #609674);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #496162,#48736a, #609674); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact.stars-1 .artifact-main-info{
        background: #7d8995;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #525965,#6c7480, #7d8995);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #525965,#6c7480, #7d8995); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .artifact-sub-info{
        background-color: #ede5d8;
        color: #74737b;
        font-family: 'Crete Round', serif;
    }

    .artifact-main-stat{
        color: #b7a59b;
    }

    .artifact-sub-stats{
        color: #66697a;
    }

    .artifact-sub-stats li:before {
        content:"·";
        font-size:20px;
        vertical-align:middle;
        line-height:20px;
    }

    .artifact-set-name{
        color: #67b05e;
    }

    .artifact-set-effects{
        color: #909291;
    }

    .include-low-stars, .roll-counter{
        text-shadow: 0px 0px 2px black;
    }
</style>