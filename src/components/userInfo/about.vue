<template>
    <div>
        <ui-collapsible title="About" class="text-dark bg-transparent character-description" open>
            <p v-html="about" class="text-left text-light font-weight-normal about">
                {{about.replace(new RegExp("\\\\n", "g"), "")}}
            </p>
        </ui-collapsible>
    </div>
</template>

<script>
  export default{
    name: 'about',
    props: {
      about: String
    }
  }
</script>

<style>
    .about{
        white-space: pre-wrap;
        max-width: 100%;
    }

    .about .userimg{
        max-width: 100%;
    }
</style>