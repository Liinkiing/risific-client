<template>
    <div class="chapter-view-page">
        <h1>Je suis la vue de détail</h1>
        <risific-pagination :slug="slug"/>
        <chapter-detail :chapter="chapter" :slug="slug"/>
        <risific-pagination :slug="slug"/>
    </div>
</template>

<script>
import ChapterDetail from "../../components/risific/ChapterDetail";
import RisificPagination from "../../components/risific/RisificPagination";

export default {
  name: "ChapterView",
  components: { RisificPagination, ChapterDetail },
  props: {
    slug: { type: String, required: true },
    chapter: { type: Number, required: true }
  },
  apollo: {
    chapters: {
      query: require("../../graphql/queries/ChaptersCountQuery.graphql"),
      variables() {
        return {
          slug: this.slug
        };
      }
    }
  },
  methods: {
    handleShortcuts(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        let chapter = this.chapter;
        if (e.keyCode === 37) {
          chapter =
            this.chapter === 1 ? this.chapters.totalCount : this.chapter - 1;
        } else if (e.keyCode === 39) {
          chapter =
            this.chapter === this.chapters.totalCount ? 1 : this.chapter + 1;
        }
        this.$router.push({
          name: "chapter.view",
          params: {
            slug: this.slug,
            chapter
          }
        });
      }
    }
  },
  mounted() {
    window.addEventListener("keyup", this.handleShortcuts.bind(this));
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.handleShortcuts);
  }
};
</script>

<style scoped>
</style>
