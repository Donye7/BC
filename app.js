$(function() {
    var activeFrame = null;

    $('#photo-upload').on('change', function() {
        let reader = new FileReader();
        reader.onload = function(e) {
            $('#user-photo').attr('src', e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
    });

    $('.frame-option').on('click', function() {
        $('.frame-option').removeClass('active');
        $(this).addClass('active');

        let frameSrc = $(this).children('img').attr('src');
        $('#frame-image').attr('src', frameSrc);
        activeFrame = frameSrc;
    });

    // Update the frame gallery based on the search field and category filter
function updateFrameGallery() {
    let searchQuery = $('#search-field').val().toLowerCase();
    let selectedCategory = $('#category-filter').val();
  
    $('.frame-option').each(function() {
      let frameName = $(this).data('name').toLowerCase();  // Assuming each frame option has a 'data-name' attribute with the name of the frame
      let frameCategory = $(this).data('category');  // Assuming each frame option has a 'data-category' attribute with the category of the frame
  
      if (frameName.includes(searchQuery) && (selectedCategory === '' || frameCategory === selectedCategory)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
  
  // Initialize the frame gallery
  updateFrameGallery();
  
  // Add event listeners for the search field and category filter
  $('#search-field, #category-filter').on('input', updateFrameGallery);
  

    $('#generate-frame').on('click', function() {
        if (!activeFrame) {
            alert('Please select a frame.');
            return;
        }

        html2canvas($('.frame-preview')[0]).then(canvas => {
            let imgData = canvas.toDataURL('image/png');
            $.post('generate_frame.php', {imgData: imgData}, function(res) {
                if (res.success) {
                    window.location = 'download.php?file=' + res.filepath;
                } else {
                    alert('There was an error generating your frame. Please try again.');
                }
            });
        });
    });
});
