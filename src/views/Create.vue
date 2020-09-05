<template>
  <div class="container">
    <Toast />
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>{{ labels.noteCreate }}</h3>
          <hr />
          <form ref="noteForm">
            <div class="form-group">
              <label for="noteName">{{ labels.noteName }}</label>
              <input
                id="noteName"
                v-model="note.noteName"
                type="text"
                class="form-control"
                :placeholder="labels.noteNamePlaceholder"
                required
              />
            </div>
            <div>
              <label>{{ labels.noteDescription }}</label>
              <vue-editor v-model="note.content" :editorToolbar="customToolbar"></vue-editor>
            </div>
            <hr />
            <button @click="saveNote" class="btn btn-primary">{{ labels.saveButton }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import Toast from 'primevue/toast'
export default {
  name: 'Create',
  data() {
    return {
      labels: {
        saveButton: this.$t('button.save'),
        noteCreate: this.$t('text.createNote'),
        noteName: this.$t('text.noteName'),
        noteNamePlaceholder: this.$t('text.noteNamePlaceholder'),
        noteDescription: this.$t('text.description')
      },
      note: {
        content: '<h1>Some initial content</h1>',
        noteName: ''
      },
      customToolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'code-block']
      ]
    }
  },
  methods: {
    saveNote(e) {
      console.log(this.$refs.noteForm.checkValidity(), e)
      if (this.$refs.noteForm.checkValidity()) {
        e.preventDefault()
        this.$store
          .dispatch('saveNote', this.note)
          .then(res => {
            console.log(res)
            this.$toast.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: 'Kayıt oluşturuldu.',
              life: 3000
            })
          })
          .catch(err => {
            console.log(err)
            this.$toast.add({
              severity: 'error',
              summary: 'Hata',
              detail: 'Kayıt başarısız.',
              life: 3000
            })
          })
      }
    }
  },
  components: { VueEditor, Toast }
}
</script>
