<template>
    <div class="chapter-view-page">
        <div v-if="$apollo.loading">Chargement...</div>
        <div v-else-if="risific">
            <h1>{{ risific.title }}</h1>
            <transition name="fade-up">
                <div v-if="risific.chapter">
                    <risific-pagination :risific-slug="risific.slug" :chapters-count="risific.chaptersCount"/>
                    <div v-html="risific.chapter.body">
                        {{ risific.chapter.body }}
                    </div>
                    <risific-pagination :risific-slug="risific.slug" :chapters-count="risific.chaptersCount"/>
                </div>
            </transition>
        </div>
        <div v-else>Rien :(</div>
    </div>
</template>

<script>
import RisificPagination from "../../components/risific/RisificPagination";

export default {
  name: "ChapterView",
  components: { RisificPagination },
  props: {
    slug: { type: String, required: true },
    chapterNumber: { type: Number, required: true }
  },
  apollo: {
    risific: {
      query: require("../../graphql/queries/ChapterViewQuery.graphql"),
      variables() {
        return {
          slug: this.slug,
          chapterNumber: this.chapterNumber
        };
      }
    }
  },
  methods: {
    handleShortcuts(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        let chapterNumber = this.chapterNumber;
        if (e.keyCode === 37) {
          chapterNumber =
            this.chapterNumber === 1
              ? this.risific.chaptersCount
              : this.chapterNumber - 1;
        } else if (e.keyCode === 39) {
          chapterNumber =
            this.chapterNumber === this.risific.chaptersCount
              ? 1
              : this.chapterNumber + 1;
        }
        this.$router.push({
          name: "chapter.view",
          params: {
            slug: this.slug,
            chapterNumber
          }
        });
      }
    }
  },
  mounted() {
    this.handleShortcuts = this.handleShortcuts.bind(this);
    window.addEventListener("keydown", this.handleShortcuts);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleShortcuts);
  }
};
</script>

<style lang="scss">
span.contenu-spoil {
  display: none;
}

.aff-spoil,
.masq-spoil {
  display: none;
}

.bloc-spoil-jv {
  & label {
    transition: all $transition-duration;
    display: inline-block;
    padding: 5px 20px;
    background: $green;
    user-select: none;
    &:hover {
      cursor: pointer;
      background: transparentize($green, 0.3);
    }
  }
  & input[type="checkbox"] {
    display: none;
    &:checked {
      & ~ label {
        background: transparentize($green, 0.3);
      }
      & ~ label ~ span.contenu-spoil {
        display: block;
      }
    }
  }
  & .contenu-spoil {
    background: transparentize($green, 0.3);
    padding: 10px;
  }
}
</style>
