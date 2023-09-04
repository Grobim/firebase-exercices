import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import type { RootState, AppDispatch } from './store';
import { closeMenu } from './uiSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMenuCloseOnLocationChange = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(closeMenu());
  }, [location]);
};
