/* eslint-disable no-unused-vars */
import React from 'react';
import Markdown from 'markdown-to-jsx';
import { useLocation } from 'react-router-dom';
import hljs from 'highlight.js';
import axios from 'axios';
import { useDev } from '../../providers/DevToolProvider';
import style from './docs.module.scss';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown-dark.css';

const Docs = () => {
  const [readMe, setReadMe] = React.useState('');
  const {
    tabs: { active },
  } = useDev();

  React.useEffect(() => {
    getReadMe();
  }, []);

  React.useEffect(() => {
    hljs.highlightAll();
  }, [readMe]);

  const getReadMe = async () => {
    try {
      const markDownURL = await import('../../../README.md');
      const content = await axios.get(markDownURL.default);
      setReadMe(content.data);
    } catch (error) {
      console.log(error);
      setReadMe('### README.md file not found');
    }
  };
  return (
    <div className={`${style['markdown-body']} markdown-body`}>
      <Markdown>{readMe}</Markdown>
    </div>
  );
};

export default Docs;
