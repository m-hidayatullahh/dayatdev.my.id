import React, { useEffect } from 'react';

interface CommentsProps {
  repo: string; // GitHub repository in the format "username/repository-name"
  theme?: string; // Theme for Utterances (default: "github-light" or "github-dark")
}

const Comments: React.FC<CommentsProps> = ({ repo, theme = 'github-light' }) => {
  useEffect(() => {
    const commentsContainer = document.getElementById('comment-container');

    const loadComments = () => {
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.async = true;
      script.setAttribute('issue-term', 'pathname'); // Link comments to the pathname
      script.setAttribute('repo', repo); // GitHub repository
      script.setAttribute(
        'theme',
        theme === 'auto'
          ? window?.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'github-dark'
            : 'github-light'
          : theme
      );
      script.setAttribute('crossorigin', 'anonymous');

      if (commentsContainer) {
        commentsContainer.innerHTML = ''; // Clear previous script if any
        commentsContainer.appendChild(script);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadComments();
        observer.disconnect();
      }
    });

    if (commentsContainer) {
      observer.observe(commentsContainer);
    }

    return () => {
      if (commentsContainer) {
        commentsContainer.innerHTML = ''; // Clean up on unmount
      }
    };
  }, [repo, theme]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Comments</h3>
      <div id="comment-container" className="mt-12"></div>
    </div>
  );
};

export default Comments;