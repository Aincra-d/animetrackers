<template>
  <div>
    <table class="table w-100">
      <tbody>
        <tr :key="news.title" v-for="news in allNews">
          <td class="cover-container align-middle">
            <img v-if="news.image" :src="news.image" class="img-fluid">
            <img v-else class="img-fluid" src="https://www.exclusivehomedesign.it/wp-content/uploads/2018/07/noPhoto.png">
          </td>

          <td class="info-container text-left text-light">
            <h6>
              {{news.title}}
            </h6>
            <p class="font-weight-normal font-12 mb-0 pb-0">
              {{news.intro}}
            </p>
            <span class="font-weight-normal font-12 w-100">
              By {{news.writer}}, {{news.date.substr(0,10)}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'mangaNew',
  props: {
    allNews: Array
  }
}
</script>

<style scoped>
  @media(max-width: 991px){
    img,.cover-container{
      width:110px;
      height:130px;
    }
  }

  @media(min-width: 991px){
    img,.cover-container{
      width:150px;
      height:180px;
    }
  }
  img{
    object-fit: cover;
  }
</style>