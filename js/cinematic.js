jQuery(document).ready(function () {
    jQuery('#game')
        .removeClass('end')
        .removeClass('running')
        .addClass('initialize')
    ;

    jQuery('#test-initialize').on('click', function() {
        jQuery('#game')
            .removeClass('end')
            .removeClass('running')
            .addClass('initialize')
        ;
    });
    jQuery('#test-running').on('click', function() {
        jQuery('#game')
            .removeClass('initialize')
            .removeClass('end')
            .addClass('running')
        ;
    });
    jQuery('#test-end').on('click', function() {
        jQuery('#game')
            .removeClass('initialize')
            .removeClass('running')
            .addClass('end')
        ;
        var el = jQuery('#end'),  
        newone = el.clone(true);
        el.before(newone);
        jQuery("." + el.attr("class") + ":last").remove();
    });
});