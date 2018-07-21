<template>
    <div class="risific-pagination">
        <router-link v-for="chapterNumber in chaptersCount"
                     :key="chapterNumber"
                     class="risific-page-link"
                     :to="{name: 'chapter.view', params: { slug: risificSlug, chapterNumber }}"
        >{{ chapterNumber }}
        </router-link>
    </div>
</template>

<script>
export default {
  name: "risific-pagination",
  props: {
    risificSlug: { type: String, required: true },
    chaptersCount: { type: Number, required: true }
  }
};
</script>

<style lang="scss" scoped>
.risific-page-link.router-link-active {
  font-weight: 900;
  color: lighten($green, 10);
}
</style>
