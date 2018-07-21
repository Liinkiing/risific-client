<template>
    <div class="chapter-view-page">
        <ApolloQuery :query="require('../../graphql/queries/ChapterViewQuery.graphql')"
                     :variables="{ slug: risificSlug, chapterNumber }">
            <template slot-scope="{ result: { data, loading, error } }">
                <div v-if="data && data.chapter" v-html="data.chapter.body">
                    {{ data.chapter.body }}
                </div>
                <div v-else-if="loading" class="fixed-bloc">
                    <loader/>
                </div>
                <div v-else class="fixed-bloc">
                    <p>On modifie l'url et on se sent HACKEUR ?&nbsp;<img data-code=":)" src="//image.jeuxvideo.com/smileys_img/1.gif" width="16" height="16" alt=""></p>
                    <p>Le chapitre n'existe pas khey</p>
                </div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script>
import RisificPagination from "../../components/risific/RisificPagination";
import Loader from "../../components/ui/Loader";

export default {
  name: "ChapterView",
  components: { Loader, RisificPagination },
  props: {
    risificSlug: { type: String, required: true },
    chapterNumber: { type: Number, required: true },
    chaptersCount: { type: Number, required: false }
  },
  methods: {
    handleShortcuts(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        let chapterNumber = this.chapterNumber;
        if (e.keyCode === 37) {
          if (this.chapterNumber > this.chaptersCount) {
            chapterNumber = 1;
          } else {
            chapterNumber =
              this.chapterNumber === 1
                ? this.chaptersCount
                : this.chapterNumber - 1;
          }
        } else if (e.keyCode === 39) {
          chapterNumber =
            this.chapterNumber >= this.chaptersCount
              ? 1
              : this.chapterNumber + 1;
        }
        this.$router.push({
          name: "chapter.view",
          params: {
            slug: this.risificSlug,
            chapterNumber
          }
        });
      }
    }
  },
  mounted() {
    this.handleShortcuts = this.handleShortcuts.bind(this);
    window.addEventListener("keyup", this.handleShortcuts);
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.handleShortcuts);
  }
};
</script>

<style lang="scss">
.fixed-bloc {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

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
