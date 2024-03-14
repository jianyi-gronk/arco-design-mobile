import React from 'react';
import demoTest from '../../../tests/demoTest';
import mountTest from '../../../tests/mountTest';
import { defaultContext } from '../../context-provider';
import FilePicker from '..';

demoTest('file-picker');

mountTest(FilePicker, 'FilePicker');

const prefix = `${defaultContext.prefixCls}-file-picker`;

describe('FilePicker', () => {

});
