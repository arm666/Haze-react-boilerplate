import React from 'react';
import { useLocation } from 'react-router-dom';
import hljs from 'highlight.js';
import userEvent from '@testing-library/user-event';
import { useDev } from '../../providers/DevToolProvider';
import { checkInside, getInputType } from '../../utils/helpers';
import style from './forms.module.scss';
import 'highlight.js/styles/monokai-sublime.css';

const Forms = () => {
  const { formData } = useDev();
  const location = useLocation();

  const currentFormData = Object.getOwnPropertyDescriptor(
    formData.forms,
    location.pathname
  )?.value;

  const handleFillData = React.useCallback(() => {
    if (currentFormData) {
      Object.entries(currentFormData.data).forEach(
        ([selector, value]: any[]) => {
          const matchElement: HTMLInputElement =
            document.querySelector(selector);

          if (matchElement) {
            const writeableTypes = [
              'text',
              'email',
              'search',
              'password',
              'textarea',
            ];

            if (checkInside(writeableTypes, getInputType(matchElement))) {
              userEvent.clear(matchElement);
              userEvent.type(matchElement, value.toString());
            } else if (
              checkInside(['checkbox', 'radio'], getInputType(matchElement))
            ) {
              value.forEach((element: string) => {
                const ele: HTMLInputElement | null =
                  document.querySelector(element);
                if (ele) {
                  if (!ele.checked) {
                    userEvent.click(ele);
                  }
                }
              });
            } else if (checkInside(['SELECT'], matchElement.tagName)) {
              userEvent.selectOptions(matchElement, value);
            }
          }
        }
      );
    }
  }, [currentFormData]);

  React.useEffect(() => {
    hljs.highlightAll();
  }, [location.pathname, handleFillData]);

  if (!currentFormData) return <div>No form data</div>;
  return (
    <div className={style.container}>
      <div>
        <button onClick={handleFillData}> Fill data</button>
      </div>
      <div>
        <pre>
          <code className={`language-json ${style.formData}`}>
            {JSON.stringify(currentFormData, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Forms;
