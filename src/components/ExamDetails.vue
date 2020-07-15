<template>
  <div id="exam_details">
    <div class="details-heading">
      <p class="exam-title">{{ this.$store.state.exams[examIdx].exam }}</p>
      <p>
        Total Subjects:
        <span>{{ this.$store.state.exams[examIdx].subjects.length }}</span>
        Total Question : <span>{{ totalQuestions }}</span> Version:
        <span>{{ this.$store.state.exams[examIdx].version }}</span>
      </p>
      <p>Job Entrance > Bank Jobs > Preliminary</p>
      <p>
        Published By
        <span>EduHive Originals</span>
      </p>
    </div>
    <div class="details-heading">
      <p>
        <i
          >Exam routine is managed by EduHive Originals. They reserve all rights
          to update the routine or syllebus from time to time.</i
        >
      </p>
    </div>
    <div class="details-body">
      <p class="title">Exam Details</p>
      <div class="details-body-card">
        <p>{{ this.$store.state.exams[examIdx].exam }}</p>
      </div>
      <p><strong>Subject(s):</strong> {{ subjectList }}</p>
      <p>Syllebus: Bank Preliminary Standard</p>
      <p>
        Question:
        <strong>{{ totalQuestions }}</strong> Marks:
        <strong>{{ totalQuestions }}</strong>
      </p>
      <p>
        Time:
        <strong>{{ this.$store.state.exams[examIdx].duration }}</strong>
        Minutes
      </p>
      <b-button
        squared
        variant="primary"
        style="margin-top: 1rem;"
        @click="onTakeExamPressed"
        >Start Exam</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExamDetails',
  props: ['examIdx'],
  methods: {
    onTakeExamPressed: function() {
      this.$emit('takeExamPressed')
    }
  },
  computed: {
    totalQuestions() {
      var qs = 0
      this.$store.state.exams[this.examIdx].subjects.forEach(subject => {
        qs += subject.questions.length
      })
      return qs
    },
    subjectList() {
      var subs = ''
      this.$store.state.exams[this.examIdx].subjects.forEach(subject => {
        subs += subject.subject + ' | '
      })
      return subs
    }
  }
}
</script>

<style lang="scss" scoped>
#exam_details {
  padding: 1rem 1rem;
}
.details-body {
  p {
    margin: 0;
  }
  .title {
    font-weight: bold;
    font-size: 1.2em;
  }
  .details-body-card {
    background-color: rgba(224, 222, 222, 0.37);
    padding: 1rem 1rem;
    margin-bottom: 1rem;
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.65);
  }
}
.details-heading {
  padding: 1rem 0;
  margin: 1rem 0;
  background-color: rgba(224, 222, 222, 0.37);
  .exam-title {
    font-size: 1.5em;
  }
  p {
    margin: 0;
    text-align: center;
  }
  span {
    color: red;
    font-weight: bold;
  }
}
</style>
