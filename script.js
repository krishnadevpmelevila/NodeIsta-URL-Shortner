$(function() {
    ["url", "text"].forEach(function(field) {
      $("#" + field).attr("required", true);
      $("#" + field).focus(function() {
        $(".success-help").fadeOut("fast");
      });
    });
  
    $(".shorturl").submit(function(e) {
      $(".mdl-spinner").fadeIn("slow").css("display", "inline-block");
      e.preventDefault();
      var baseUrl = "http://localhost:5000/api/url/shorten"
      var url = $("#url").val();
      var text = $("#text").val();
      var sent = {"longUrl":url}
      var newData = JSON.stringify(sent);
      $.ajax({
        url: baseUrl,
        contentType : 'application/json; charset=utf-8',
        type:'POST',    
        data: newData,
        error: function(jqXHR, textStatus, errorThrown) {
          $(".mdl-spinner").fadeOut("fast");
          if (jqXHR.status == 409) {
            $(".success-help")
              .html(
                "<i>" + text + "</i> is already taken, please use another text!"
              )
              .fadeIn("slow");
          } else {
            $(".success-help").html("An error has occurred").fadeIn("slow");
          }
        },
        success: function(data) {
          $(".mdl-spinner").fadeOut("fast");
          ["url", "text"].forEach(function(field) {
            $("#" + field).val("");
          });
          $(".success-help").html('Your custom URL is ready. <a class="mylink" target="_blank" href='+data.shortUrl+'>'+data.shortUrl+'</a>').fadeIn("slow");
        },
        type: "POST"
      });
    });
  });
