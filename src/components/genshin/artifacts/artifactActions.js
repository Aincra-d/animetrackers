export let actions={
    upgrade: function(artifacts,sub_stats,main_stats,max_sub_counts){
        let artifact=artifacts[0];

        if(artifact.stats.subs.length === max_sub_counts[artifact.info.stars-1]){
            if(artifact.info.level !== artifact.info.max_level){
                let random_sub=artifact.stats.subs[Math.floor(Math.random() * artifact.stats.subs.length)];

                let sub_values=sub_stats.filter(sub => sub.name === random_sub.name)[0].values[artifact.info.stars];

                random_sub.value+=sub_values[Math.floor(Math.random() * sub_values.length)];
                random_sub.level+=1;
                artifact.info.level+=4;

                artifact.stats.main.value=main_stats[artifact.info.stars-1].stats[artifact.stats.main.name][artifact.info.level]
            }
        }
        else{
            switch (artifact.stats.main.name) {
                case 'Elemental Mastery':
                sub_stats.splice(sub_stats.findIndex(sub => sub.name === 'Elemental Mastery'),1);
                break;

                case 'CRIT DMG%':
                sub_stats.splice(sub_stats.findIndex(sub => sub.name === 'CRIT DMG%'),1);
                break;

                case 'CRIT Rate%':
                sub_stats.splice(sub_stats.findIndex(sub => sub.name === 'CRIT Rate%'),1);
                break;

                case 'Energy Recharge%':
                sub_stats.splice(sub_stats.findIndex(sub => sub.name === 'Energy Recharge%'),1);
                break;
            }

            let random_sub=sub_stats[Math.floor(Math.random() * sub_stats.length)];

            let isSubFree=artifact.stats.subs.filter(sub => sub.name === random_sub.name).length === 0 ? true : false;

            while(!isSubFree){
                random_sub=sub_stats[Math.floor(Math.random() * sub_stats.length)];

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
            artifact.stats.main.value=main_stats[artifact.info.stars-1].stats[artifact.stats.main.name][artifact.info.level]
        }
    }
}