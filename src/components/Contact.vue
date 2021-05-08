<template>
  <div class="contact">
    <div class="direct">
      <h2>Contact us directly</h2>
      <div>Trimax Fire Protection Associates</div>
      <div>Yada yada yada address</div>
      <div>South Lyon, MI 48018</div>
      <div>(248) 437-3300</div>
    </div>
    <div class="message">
      <h2>Or send us a message</h2>
      <form class="contact" @submit.prevent="submit">
        <fieldset class="contact-form">
          <legend>Contact Form</legend>
          <div class="side-by-side">
            <label class="label" for="name">Name</label>
            <input type="text" name="name" id="name" required="" v-model="name">
          </div>
          <div class="side-by-side">
            <label class="label" for="name">Company</label>
            <input type="text" name="name" id="name" required="" v-model="name">
          </div>
          <div class="side-by-side">
            <label class="label" for="email">Email</label>
            <input type="email" name="email" id="email" required=""
                  :class="{ email , error: !email.valid }"
                  v-model="email.value">
          </div>
          <div class="side-by-side">
            <label class="label" for="name">Phone Number</label>
            <input type="text" name="name" id="name" required="" v-model="name">
          </div>
          <div class="column">
            <label class="label" for="whatdo">What can we do for you today?</label>
            <textarea class="message" name="whatdo" id="whatdo" required=""
                      v-model="message.text"
                      :maxlength="message.maxlength"></textarea>
          </div>

          <div>
            <span class="counter">{{ message.text.length }} / {{ message.maxlength }}</span>
          </div>
          <div>
            <input type="submit" value="Send Form">
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export default {
  name: 'Contact',
  data: function() {
    return {
      name: "John Doe",
      email: {
        value: "jo@hnd.oe",
        valid: true
      },
      features: ["Reactivity", "Encapsulation", "Data Binding"],
      selection: {
        member: "0",
        framework: "vue",
        features: []
      },
      message: {
        text: `Dear Mr. President,\n...`,
        maxlength: 255
      },
      submitted: false
    };
  },
  methods: {
    // submit form handler
    submit: function() {
      this.submitted = true;
    },
    // validate by type and value
    validate: function(type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },
    // check for valid email adress
    isEmail: function(value) {
      return emailRegExp.test(value);
    },
    // check or uncheck all
    checkAll: function(event) {
      this.selection.features = event.target.checked ? this.features : [];
    }
  },
  watch: {
    // watching nested property
    "email.value": function(value) {
      this.validate("email", value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.contact {
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  margin: 0 10px 20px;
}

.message {
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
}

h1, .direct, .message > h2 {
  text-align: center;
}

form {
  width: 500px;
}

@media screen and (max-width: 667px) {
  form {
    width: 90vw;
  }
}

.contact-form {
  display: flex;
  flex-flow: column nowrap;
}
.contact-form div {
  display: flex;
}

.contact-form div.column {
  flex-flow: column nowrap;
}


@media screen and (min-width: 668px) {
  .contact-form div.side-by-side label {
    flex: 0 0 80px;
  }
}

.contact-form div.side-by-side input  {
  flex: 1 0 auto;
}
</style>
