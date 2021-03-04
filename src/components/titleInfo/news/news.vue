<template>
  <div>
    <table class="table w-100">
      <tbody>
        <tr :key="news.title" v-for="news in allNews">
          <td class="cover-container align-middle p-1">
            <router-link v-if="news.image" :to="'/new/'+news.id">
              <img :alt="news.title" :src="news.image" class="img-fluid news-cover rounded">
            </router-link>
          </td>

          <td class="info-container text-left text-light">
            <router-link class="text-light" :to="'/new/'+news.id">
                <h6>
                  {{news.title}}
                </h6>
            </router-link>

            <p class="font-weight-normal font-12 mb-0 pb-0">
              {{news.intro}}
            </p>

            <span class="font-weight-normal font-12 w-100">
              By
              <router-link :to="'/user/'+news.writer">
                {{news.writer}}
              </router-link>
              , {{news.date}}
            </span>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'titleNew',
  props: {
    allNews: Array
  }
}
</script>

<style scoped>
  @media(max-width: 991px){
    .news-cover,.cover-container{
      width:110px;
      height:140px;
    }
  }

  @media(min-width: 991px){
    .news-cover,.cover-container{
      width:150px;
      height:190px;
    }
  }
  .news-cover{
    object-fit: cover;
  }
</style>