let ValidateSingleton = (function () {
  Validate.prototype.get = function get() {
    return Validate.validate;
  };
  Validate.prototype.set = function set(v) {
    Validate.validate = v;
  };
  function Validate() {}

  function getInstance() {
    if (!Validate.validate) {
      Validate.validate = new Validate();
      delete Validate.prototype.constructor;
    }
    return Validate.validate;
  }
  return {
    getInstance,
  };
})();

let validated = ValidateSingleton.getInstance();
validated.set(false);

$(function () {
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LdWKUMaAAAAAF8zS_5ima4fp7rtuDz19s2tdvEU", {
        action: "facialai",
      })
      .then(function (token) {
        $("#recaptchaResponse").val(token);
      });
  });

  $("#recaptchacheck").submit(function (event) {
    event.preventDefault();
    if (validated) {
      return false;
    }
    $.ajax({
      url: "verifyperson.php",
      type: "POST",
      data: $(this).serialize(),
      dataType: "json",
    })
      .done(function (response) {
        const { status, message } = response;
        if (status) {
          validated.set(true);
          $("#alert").addClass("d-none").text("");
        } else {
          $("#alert").removeClass("d-none").text(message);
        }
      })
      .fail(function (jqXhr, json, errorThrown) {
        $("#alert").removeClass("d-none").text(jqXhr.responseText);
      });
  });
});
