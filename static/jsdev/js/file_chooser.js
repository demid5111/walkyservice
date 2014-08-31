(function ($) {
    $(function () {

        var addFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
            

            //$(this)
            //    .toggleClass('btn-success btn-add btn-danger btn-remove')
            //    .html('–');
            //Show remove button
            $formGroup.find('.btn-remove').removeClass('hidden');
            //Disable Add button and Input
            $formGroup.find('.btn-file').attr("disabled", "disabled");
            $formGroup.find('.input-file').attr("disabled", "disabled");
            //Display file name in input form
            var $filename = $formGroup.find('.input-file').val();
            $formGroup.find('.form-control').val($filename);
            

            //$formGroupClone.find('.form-control').val('');
            //$formGroupClone.find('.concept').text('Phone');
            
            //$formGroupClone.insertAfter($formGroup);

            //var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') > countFormGroup()) {
                //$lastFormGroupLast.find('.btn-add').attr('disabled', true);
                var $formGroupClone = $formGroup.clone();
                $formGroup.removeClass("active");
                //Hide remove button
                $formGroupClone.find('.btn-remove').addClass('hidden');
                //Enable Add button and Input
                $formGroupClone.find('.btn-file').attr("disabled", false);
                $formGroupClone.find('.input-file').attr("disabled", false);
                //Set input value to null
                $formGroupClone.find('.input-file').val('');
                $formGroupClone.find('.form-control').val('');
                $formGroupClone.insertAfter($formGroup);
            } else{
                $formGroup.removeClass("active");
            }
        };

        var removeFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
            
            
            //Find last Form Group element
            var $lastFormGroupLast = $("#file_upload_wrapper").find('.form-group:last');
            
            if ( $multipleFormGroup.data('max') == countSelectedFormGroup() ) {
                //Remove selected element
                $formGroup.remove();
                //clone the last element
                var $lastFormGroupClone = $("#file_upload_wrapper").find('.form-group:last').clone();
                //Set input value to null
                $lastFormGroupClone.find('.input-file').val('');
                //Delete filename from form
                $lastFormGroupClone.find('.form-control').val('');
                //Hide Delete Button
                $lastFormGroupClone.find('.btn-remove').addClass('hidden');
                //Enable Add Photo button
                $lastFormGroupClone.find('.btn-file').attr("disabled", false);
                $lastFormGroupClone.find('.input-file').attr("disabled", false);
                $lastFormGroupClone.addClass("active");
                //inser empty item after last
                $lastFormGroupClone.insertAfter($("#file_upload_wrapper").find('.form-group:last'));
            } else if ( $multipleFormGroup.data('max') > countSelectedFormGroup() ){
                //Remove selected element
                $formGroup.remove();
            }

            
        };
/*
        var selectFormGroup = function (event) {
            event.preventDefault();

            var $selectGroup = $(this).closest('.input-group-select');
            var param = $(this).attr("href").replace("#","");
            var concept = $(this).text();

            $selectGroup.find('.concept').text(concept);
            $selectGroup.find('.input-group-select-val').val(param);

        }
*/
        var countSelectedFormGroup = function () {
            return $("#file_upload_wrapper").find('.form-group').not('.active').length;
        };

        var countFormGroup = function () {
            return $("#file_upload_wrapper").find('.form-group').length;
        };

        $(document).on('change', '.input-file', addFormGroup);
        //$(document).on('click', '.btn-add', addFormGroup);
        $(document).on('click', '.btn-remove', removeFormGroup);
        //$(document).on('click', '.dropdown-menu a', selectFormGroup);

    });

})(jQuery);