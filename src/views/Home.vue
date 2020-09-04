<template>
  <div class="container">
    <v-row justify="center">
      <div class="col-12 mb-5 card mt-5 shadow">
        <div class="card-body">
          <h3>{{ labels.noteList }}</h3>
          <div class="row col-12 text-center">
            <div
              @click="personalClick"
              :class="
                noteTypeStyle.isClicked
                  ? noteTypeStyle.active
                  : noteTypeStyle.inactive
              "
            >
              Kişisel Notlarım
            </div>
            <div
              @click="teamClick"
              :class="
                noteTypeStyle.isClicked
                  ? noteTypeStyle.inactive
                  : noteTypeStyle.active
              "
            >
              Team Notlarım
            </div>
          </div>
          <hr />
          <v-expansion-panels popout v-model="panel" multiple>
            <v-expansion-panel v-for="(note, index) in getNotes" :key="index">
              <v-expansion-panel-header v-slot="{ open }">
                <v-row no-gutters>
                  <v-col cols="4">{{ note.noteName }}</v-col>
                  <v-col cols="8" class="text--secondary">
                    <v-fade-transition leave-absolute>
                      <span v-if="open">{{ note.createAt | dateConvert }}</span>
                      <v-row v-else no-gutters style="width: 100%">
                        <v-col cols="6">Yazar: {{ note.authorEmail }}</v-col>
                        <v-col cols="6"
                          >Create date: {{ note.createAt | dateConvert }}</v-col
                        >
                      </v-row>
                    </v-fade-transition>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div class="row">
                  <div class="col-12 float-right">
                    <span
                      @click="isShare = !isShare"
                      class="btn btn-secondary float-left"
                      >paylaş</span
                    >
                    <input
                      v-if="isShare"
                      v-model="shareInput"
                      type="text"
                      class="ml-3 form-control col-4 float-left"
                      placeholder="Email"
                    />
                    <button
                      @click="shareButton(note)"
                      v-if="isShare"
                      class="ml-2 btn btn-primary"
                    >
                      Kaydet
                    </button>

                    <span class="btn btn-danger float-right">X</span>
                  </div>
                  <div class="col-12 float-right">
                    <vue-editor
                      v-if="isShow"
                      v-model="note.content"
                      :editorOptions="editorOpt"
                      :editorToolbar="customToolbar"
                    ></vue-editor>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <div v-if="getNotes.length < 1" class="alert alert-warning">
            <strong>Henüz Burada Bir Kayıt Bulamadık</strong>
            <br />
            <small
              >Kayıt Eklemek için Ürün İşlemleri menüsünden
              yararlanabilirsiniz</small
            >
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'Home',
  data() {
    return {
      noteTypeStyle: {
        active: 'col-6 btn text-light bg-info',
        inactive: 'col-6 btn bg-light',
        isClicked: true
      },
      panel: '',
      disable: false,
      isShow: true,
      customToolbar: [0],
      editorOpt: {
        readOnly: true
      },
      labels: {
        noteList: 'Note Listesi'
      },
      shareInput: '',
      isShare: false
    }
  },
  methods: {
    shareButton(item) {
      console.log(this.shareInput, item)
      this.$store.dispatch('shareNote', {
        shareInput: this.shareInput,
        ...item
      })
    },
    teamClick() {
      this.noteTypeStyle.isClicked = false
      this.$store.dispatch('getGroupNotes')
    },
    personalClick() {
      this.noteTypeStyle.isClicked = true
      this.$store.dispatch('getUserNotes')
    }
  },
  created() {
    this.$store.dispatch('getUserNotes')
  },
  beforeCreate() {
    this.$store.state.isLoading.display = 'block'
    this.$store.dispatch('getNotes').then(() => {
      this.$store.state.isLoading.display = 'none'
    })
  },
  computed: {
    getNotes() {
      return this.$store.getters.getAllNotes
    }
  },
  components: { VueEditor }
}
</script>
