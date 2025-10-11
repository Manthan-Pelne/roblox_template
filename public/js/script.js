  async function shareItem(itemId, shareBtn) {
    const shareableUrl = `${window.location.origin}/fetchtemplate/${itemId}`;
    const shareIcon = shareBtn.querySelector('.share-icon');
    const tickIcon = shareBtn.querySelector('.tick-icon');

    try {
      await navigator.clipboard.writeText(shareableUrl);
      shareIcon.classList.add('hidden');
      tickIcon.classList.remove('hidden');

      setTimeout(() => {
        tickIcon.classList.add('hidden');
        shareIcon.classList.remove('hidden');
      }, 2000);

    } catch (err) {
      console.error('Failed to copy: ', err);
      // Optional: Add a visual indicator to the user that the copy failed.
    }
  }