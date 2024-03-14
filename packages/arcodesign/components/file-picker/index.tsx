import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { Promise } from 'es6-promise';
import { componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Button from '../button';
import { AdapterFile, FilePickerRef, FilePickerProps, FilePickItem } from './type';
import { useLatestRef } from '../_helpers';
import { IconUpload, IconDelete } from '../icon';

export * from './type';

const FilePicker = forwardRef((props: FilePickerProps, ref: Ref<FilePickerRef>) => {
    const {
        className = '',
        style,
        accept = '*',
        // multiple = false,
        // capture,
        limit = 10,
        files = [],
        maxSize,
        // disabled,
        // deleteIcon,
        // selectIcon,
        // hideDelete = false,
        // hideSelect = false,
        // alwaysShowSelect = false,
        // imageProps,
        // renderLoading,
        // renderError,
        // onLongPress,
        // onClick,
        onChange = () => null,
        onMaxSizeExceed,
        onLimitExceed,
        upload,
        selectAdapter,
        onSelectClick,
        onDeleteClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const cacheRef = useLatestRef<FilePickItem[]>(files);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const parseFile = (file: AdapterFile) => {
        return new Promise((resolve, reject) => {
            if (file.url) {
                resolve(file.url);
            } else {
                const reader = new FileReader();
                reader.onload = e => {
                    const dataURL: string = e.target?.result as string;
                    if (!dataURL) {
                        reject(new Error('file parse error'));
                    }
                    resolve(dataURL);
                };
                reader.onerror = () => {
                    reject(new Error('file parse error'));
                };
                reader.readAsDataURL(file as File);
            }
        });
    };

    const handleChange = (event, fromAdapter?: boolean) => {
        const newFiles =
            (Array.prototype.filter.call(event.target.files || [], file => {
                // 过滤maxSize
                if (maxSize && file.size > maxSize * 1024) {
                    onMaxSizeExceed && onMaxSizeExceed(file);
                    return false;
                }
                return true;
            }) as File[]) || [];
        if (!fromAdapter) {
            event.target.value = '';
        }
        // 截断limit
        if (limit !== 0 && newFiles.length + files.length > limit) {
            onLimitExceed && onLimitExceed(newFiles);
            newFiles.length = limit - files.length;
        }
        // 解析文件生成预览
        Promise.all(newFiles.map(file => parseFile(file))).then(parseFiles => {
            const res = parseFiles.map((url, index) => ({
                url,
                status: typeof upload === 'function' ? 'loading' : 'loaded',
                file: newFiles[index],
            })) as FilePickItem[];
            cacheRef.current = [...cacheRef.current, ...res];
            onChange([...cacheRef.current]);
            // 执行upload
            if (typeof upload === 'function') {
                newFiles.forEach(_file => {
                    upload(cacheRef.current.find(({ file }) => file === _file) as FilePickItem)
                        .then(data => {
                            const index = cacheRef.current.findIndex(({ file }) => file === _file);
                            if (index !== -1) {
                                cacheRef.current[index] = {
                                    ...cacheRef.current[index],
                                    ...data,
                                    status: undefined,
                                };
                            }
                        })
                        .catch(() => {
                            const index = cacheRef.current.findIndex(({ file }) => file === _file);
                            if (index !== -1) {
                                cacheRef.current[index].status = 'error';
                            }
                        })
                        .finally(() => {
                            onChange([...cacheRef.current]);
                        });
                });
            }
        });
    };

    const handleDelete = (index: number) => {
        onDeleteClick && onDeleteClick(index);
        onChange(files.filter((_i, j) => j !== index));
    };

    // // click && longPress
    // let timeOutEvent;
    // const handleTouchStart = (
    //     e: React.TouchEvent<HTMLDivElement>,
    //     image: FilePickItem,
    //     index: number,
    // ) => {
    //     timeOutEvent = setTimeout(() => {
    //         timeOutEvent = 0;
    //         onLongPress?.(e, image, index);
    //     }, 750);
    // };
    // const handleClick = (
    //     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    //     image: FilePickItem,
    //     index: number,
    // ) => {
    //     clearTimeout(timeOutEvent);
    //     if (timeOutEvent !== 0) {
    //         onClick?.(e, image, index);
    //     }
    // };

    const handleSelect = (e: React.MouseEvent) => {
        if (e.target !== fileRef.current) {
            onSelectClick && onSelectClick();
            selectAdapter
                ? selectAdapter().then(({ files }) => handleChange({ target: { files } }, true))
                : fileRef.current?.click();
        }
    };

    // const getGridData = (prefixCls, locale) => {
    //     const errorNode = (index: number) => {
    //         if (renderError) {
    //             return typeof renderError === 'function' ? renderError(index) : renderError;
    //         }
    //         return (
    //             <div className={`${prefixCls}-file-picker-error`}>
    //                 <p>{locale.FilePicker.loadError}</p>
    //             </div>
    //         );
    //     };
    //     const loadingNode = (index: number) => {
    //         if (renderLoading) {
    //             return typeof renderLoading === 'function' ? renderLoading(index) : renderLoading;
    //         }
    //         return null;
    //     };
    // const data = (limit && limit < files.length ? files.slice(0, limit) : files).map(
    //     (image, index) => {
    //         const { url, status } = image;
    //         return {
    //             img: (
    //                 <div key={`${index}-${url}`} className={`${prefixCls}-file-picker-image`}>
    //                     <div
    //                         onTouchStart={e => handleTouchStart(e, image, index)}
    //                         onClick={e => handleClick(e, image, index)}
    //                         className={`${prefixCls}-file-picker-image-container`}
    //                     >
    //                         <Image
    //                             showLoading
    //                             showError
    //                             {...(imageProps || {})}
    //                             src={url}
    //                             errorArea={errorNode(index)}
    //                             loadingArea={loadingNode(index)}
    //                             status={status || imageProps?.status}
    //                         />
    //                         <div className={`${prefixCls}-file-picker-image-mask`} />
    //                     </div>
    //                     {!hideDelete && (
    //                         <div
    //                             className={`${prefixCls}-file-picker-close`}
    //                             onClick={() => handleDelete(index)}
    //                         >
    //                             {deleteIcon || (
    //                                 <div className={`${prefixCls}-file-picker-close-icon`}>
    //                                     <IconClose />
    //                                 </div>
    //                             )}
    //                         </div>
    //                     )}
    //                 </div>
    //             ),
    //             title: '',
    //         };
    //     },
    // );
    //     const showSelect = !hideSelect && files.length < (limit || Infinity);
    //     const disableSelect = disabled || (alwaysShowSelect && !showSelect);
    //     if (showSelect || alwaysShowSelect) {
    //         data.push({
    //             img: (
    //                 <div
    //                     className={cls(`${prefixCls}-file-picker-add`, {
    //                         [`${prefixCls}-file-picker-add-disabled`]: disableSelect,
    //                     })}
    //                     onClick={handleSelect}
    //                 >
    //                     <div className={`${prefixCls}-file-picker-add-container`}>
    //                         {selectIcon || (
    //                             <div className={`${prefixCls}-file-picker-add-icon`}>
    //                                 <AddIcon />
    //                             </div>
    //                         )}
    //                         {!selectAdapter ? (
    //                             <input
    //                                 capture={capture}
    //                                 accept={accept}
    //                                 multiple={multiple}
    //                                 type="file"
    //                                 onChange={e => handleChange(e)}
    //                                 ref={fileRef}
    //                             />
    //                         ) : null}
    //                     </div>
    //                 </div>
    //             ),
    //             title: '',
    //         });
    //     }
    //     return data;
    // };

    const getUploadList = prefixCls => {
        const data = (
            <div className={`${prefixCls}-file-picker-list`}>
                {(limit && limit < files.length ? files.slice(0, limit) : files).map(
                    (fileItem, index) => {
                        const { file, status } = fileItem;
                        return (
                            <div className={`${prefixCls}-file-picker-list-item`} key={index}>
                                <div className={`${prefixCls}-file-picker-list-item-container`}>
                                    <div className={`${prefixCls}-file-picker-list-item-text`}>
                                        {file.name}
                                    </div>
                                    {status === 'error' && <div />}
                                    {status === 'error' && <div />}
                                </div>
                                <IconDelete onClick={() => handleDelete(index)} />
                            </div>
                        );
                    },
                )}
            </div>
        );
        return data;
    };

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div className={`${prefixCls}-file-picker ${className}`} style={style} ref={domRef}>
                    <div className={`${prefixCls}-file-picker-container`}>
                        <div className={`${prefixCls}-file-picker-add`}>
                            <input
                                type="file"
                                accept={accept}
                                onChange={e => handleChange(e)}
                                ref={fileRef}
                            />
                            <Button icon={<IconUpload />} style={style} onClick={handleSelect}>
                                点击上传
                            </Button>
                        </div>
                        {getUploadList(prefixCls)}
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});

/**
 * 文件选择器组件
 * @en FilePicker Component
 * @type 数据录入
 * @type_en Data Entry
 * @name 文件选择器
 * @name_en FilePicker
 * @displayName FilePicker
 */
export default componentWrapper(FilePicker, 'FilePicker');
