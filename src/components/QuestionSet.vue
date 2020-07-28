<template>
  <div id="quiz">
    <h2 style="text-align: center">{{ exam.exam }}</h2>
    <b-container>
      <b-row>
        <b-col sm="12" md="8" lg="8" xl="8">
          <b-card no-body style="border: none">
            <b-tabs pills card>
              <b-tab
                v-for="(subject, subjectIdx) in exam.subjects"
                :key="subjectIdx"
              >
                <template v-slot:title
                  >{{ subject.subject }} ({{ subject.answered }} /
                  {{ subject.questions.length }})</template
                >
                <div>
                  <div class="question">
                    <h4>
                      {{ subject.questions[subject.currentIndex].question }}
                    </h4>
                  </div>
                  <div
                    class="question-option"
                    v-for="(option, optionIdx) in subject.questions[
                      subject.currentIndex
                    ].options"
                    :key="optionIdx"
                    :class="{
                      selected:
                        exam.subjects[subjectIdx].questions[
                          subject.currentIndex
                        ].selectedOptionIdx === optionIdx
                    }"
                    @click="
                      optionSelectd(subjectIdx, subject.currentIndex, optionIdx)
                    "
                  >
                    <span>{{ option.slug }}.</span>
                    {{ option.option }}
                  </div>
                  <div class="question-nevigation">
                    <b-button
                      variant="primary"
                      @click="previousQuestion(subjectIdx)"
                      style="background-color: rgb(0, 22, 121); border-color: rgb(0, 22, 121);"
                      :disabled="subject.currentIndex === 0"
                      >Previous</b-button
                    >
                    <b-button
                      variant="success"
                      @click="nextQuestion(subjectIdx)"
                      style="margin-left: 1rem"
                      :disabled="
                        subject.currentIndex === subject.questions.length - 1
                      "
                      >Next</b-button
                    >
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
        <b-col sm="12" md="4" lg="4" xl="4">
          <div class="time-wrapper">
            <div class="timer">
              <p>Time Remaining</p>
              <p>{{ hour }} : {{ minute }} : {{ second }}</p>
            </div>
            <b-button
              variant="warning"
              block
              @click="$emit('endExam', { rem: remainingTime })"
              >End Exam</b-button
            >
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'QuestionSet',
  props: ['examIdx'],
  data: function() {
    return {
      remainingTime: 0,
      interval: ''
    }
  },
  watch: {
    remainingTime: function() {
      if (this.remainingTime === 0) {
        clearInterval(this.interval)
        var rem = this.remainingTime
        this.$emit('endExam', { rem })
      }
    }
  },
  mounted() {
    this.remainingTime = parseInt(
      this.$store.state.exams[this.examIdx].duration
    )
    this.remainingTime *= 60

    this.interval = setInterval(() => {
      this.remainingTime--
    }, 1000)
  },
  computed: {
    exam() {
      return this.$store.state.exams[this.examIdx]
    },
    hour() {
      return Math.floor(this.remainingTime / (60 * 60))
    },
    minute() {
      var rem = this.remainingTime % (60 * 60)
      return Math.floor(rem / 60)
    },
    second() {
      var rem = this.remainingTime % (60 * 60)
      rem %= 60
      return rem
    }
  },
  methods: {
    nextQuestion: function(subjectIdx) {
      var payload = {
        examidx: parseInt(this.examIdx),
        subidx: subjectIdx
      }
      this.$store.dispatch('next', payload)
    },
    previousQuestion: function(subjectIdx) {
      var payload = {
        examidx: parseInt(this.examIdx),
        subidx: subjectIdx
      }
      this.$store.dispatch('previous', payload)
    },
    optionSelectd: function(subidx, quesidx, optidx) {
      var payload = {
        examidx: parseInt(this.examIdx),
        subidx: subidx,
        quesidx: quesidx,
        optidx: optidx
      }
      this.$store.dispatch('update_choice', payload)
    }
  }
}
</script>

<style lang="scss">
$primary_color: rgb(0, 22, 121);
#quiz {
  margin-bottom: 5rem;
}
.time-wrapper {
  display: inline-block;
  position: relative;
  width: 80%;
  top: 35%;
  left: 50%;
  transform: translate(-50%);
  text-align: center;
  border-radius: 8px;
  .timer-heading {
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
  }
  .timer {
    padding: 1rem 1rem;
    background-color: rgba(201, 201, 201, 0.1);
  }
}

.question-option {
  margin: 1rem 0;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  span {
    font-size: 1.2em;
    font-weight: 500;
    color: black;
  }
}
.selected {
  background-color: $primary_color;
  color: white;

  span {
    color: white;
  }
}
.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  color: white;
  background-color: $primary_color;
  border-color: $primary_color;
  border-bottom: 1px solid;
}

.card {
  .tabs {
    .card-header {
      background-color: white;
      border: none;

      .nav {
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: auto;
      }
      .nav-pills .nav-link {
        border-radius: 2px;
        margin: 0 1rem;
      }
    }
    .question-nevigation {
      text-align: center;
    }
  }
}
.nav-link {
  color: rgba(0, 0, 0, 0.65);
}

.horizontal-link {
  a {
    display: block;
    color: rgba(0, 0, 0, 0.65);
    text-decoration: none;
    transition: 0.3s;
    font-size: 1em;

    &:hover {
      color: rgba(0, 0, 0, 0.95);
      font-size: 1.1em;
    }
  }
}
</style>
