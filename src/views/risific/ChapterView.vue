<template>
    <div class="chapter-view-page">
        <h1>Je suis la vue de détail</h1>
        <chapter-detail :chapter="chapter" :slug="slug"/>
        <risific-pagination :slug="slug"/>
    </div>
</template>

<script>
import ChapterDetail from "../../components/risific/ChapterDetail";
import RisificPagination from "../../components/risific/RisificPagination";
export default {
  name: "ChapterView",
  components: {RisificPagination, ChapterDetail },
  props: {
    slug: { type: String, required: true },
    chapter: { type: Number, required: true }
  }
};
</script>

<style scoped>
</style>
