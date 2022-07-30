const notifications = new Array();

function addNotification(title, has_action, duration) {
    notifications.push({
    title: title,
    has_action: has_action,
    duration: duration,
  });
}

function execute_interval() {
  if (notifications.length > 0 && $(".notificaion_list_item").length < 3) {
    const notification = notifications[0];
    showNotification(notification);
    notifications.shift();
  }
}

var interval = setInterval(execute_interval, 1000);

function showNotification(notification) {
 var list =  $(notificaion_list);
  var entry = "<div class='notificaion_list_item'><div class='top_row'>"+notification.title+"</div>";
  if(notification.has_action == true){
    entry += "<div class='bottom_row'><div class='option'><div class='ok'>J</div> Ja</div><div class='option'><div class='abort'>N</div> Nein</div></div>";
  }
  entry +=  "<div class='progress_row'></div></div>";
  var entry_jquery = $(entry);

  list.append(entry_jquery);
  $(entry_jquery).animate(
    {
      top: "0rem",
      opacity: "1",
    },
    {
      duration: 500,
      easing: "swing",
      done: function () {

        $(entry_jquery.find(".progress_row")).animate(
          {
            width: "0%",
          },
          {
            duration: notification.duration,
            easing: "swing",
            done: function () {
            },
          }
        );


        setTimeout(function () {
          $(entry_jquery).animate(
            {
              left: "-1rem",
              opacity: "0",
            },
            {
              duration: 500,
              easing: "swing",
              done: function () {
                entry_jquery.remove();
              },
            }
          );
        }, notification.duration);
      },
    }
  );
}
