<template>
  <div class="container">
    <div class="row">
      <div class="col-6 offset-3 pt-3 card mt-5 shadow">
        <div class="card-body">
          <h3>{{ labels.noteCreate }}</h3>
          <hr />
          <div class="form-group">
            <label>{{ labels.noteName }}</label>
            <input
              v-model="note.noteName"
              type="text"
              class="form-control"
              :placeholder="labels.noteNamePlaceholder"
            />
          </div>
          <div class="form-group">
            <label>{{ labels.noteDescription }}</label>
            <vue-editor
              v-model="note.content"
              :editorToolbar="customToolbar"
            ></vue-editor>
          </div>
          <hr />
          <button @click="saveNote()" class="btn btn-primary">
            {{ labels.saveButton }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'

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
    saveNote() {
      this.$store
        .dispatch('saveNote', this.note)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: { VueEditor }
}
</script>
