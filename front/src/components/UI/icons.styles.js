import { colors } from "./colors";

import styled from "styled-components";
import {FaInfoCircle, FaEdit, FaUsers, FaRegCalendarAlt} from 'react-icons/fa';
import {TbCalendarPlus} from 'react-icons/tb';
import {MdAddCircle, MdAdminPanelSettings} from 'react-icons/md';
import {RiDeleteBin6Line, RiUserSettingsLine} from 'react-icons/ri'
import {BsEmojiFrown} from 'react-icons/bs'

export const IconError = styled(BsEmojiFrown).attrs({
    size: '10rem',
    color: colors.beige
})``;

export const IconAmin = styled(MdAdminPanelSettings).attrs({
    size:'1.5rem',
    color: colors.darkBlue,
})``;

export const IconInfoCircle = styled(FaInfoCircle).attrs({
    size:'1.375rem',
    color: colors.darkBlue,
})``;

export const IconEdit = styled(FaEdit).attrs({
    size:'1.15rem',
    color: colors.darkBlue,    
})``;

export const IconEditWhite = styled(FaEdit).attrs({
    size:'1.5rem',
    color: 'white',
})``;

export const IconAdd = styled(MdAddCircle).attrs({
    size:'3rem',
    color: colors.darkBlue,
})``;

export const IconAddWhite = styled(MdAddCircle).attrs({
    size:'2rem',
    color: 'white',
})``;

export const IconDelete = styled(RiDeleteBin6Line)``;

export const IconAddShifts = styled(TbCalendarPlus).attrs({    
    size:'1.5rem',
    color: colors.darkBlue,
})``

const navIconSize = '5.5rem';

export const IconClients = styled(FaUsers).attrs({
    size: navIconSize,
    color: colors.beige,
})``;

export const IconAppointments = styled(FaRegCalendarAlt).attrs({
    size: navIconSize,
    color: colors.beige,
})``;

export const IconEmployee = styled(RiUserSettingsLine).attrs({
    size: navIconSize,
    color: colors.beige,    
})``;