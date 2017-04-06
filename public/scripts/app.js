$(".container").css("margin-top", $("#main-menu").height() + 20);

$('.message .close').on('click', function() {
    $(this).closest('.message').transition('fade');
});