import { PageResponse } from "../../services/type";
import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FilterOptionsState,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "react-toastify";

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "renderInput" | "options"
  > {
  control: any;
  name: string;
  label: ReactNode;
  placeholder?: any;
  rules?: any;
  disabled?: boolean;
  readOnly?: boolean;
  labelPath?: string;
  labelPath2?: string;
  labelPathForAddress?: boolean;
  valuePath?: string;
  isHasMessageError?: boolean;
  helperText?: string;
  required?: boolean;
  params?: any;
  type?: any;
  sign?: string;
  variant?: "outlined" | "filled" | "standard";
  isViewProp?: boolean;
  exceptValues?: any[];
  fetchDataFn: (val: any, type?: any) => Promise<PageResponse<any>>;
  onChangeValue?: (val: any) => void;
  onAfterChangeValue?: () => void;
}

const CoreSelectCustomAPI: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const { t } = useTranslation();

  const {
    control,
    name,
    multiple,
    placeholder,
    rules,
    label,
    disabled,
    readOnly,
    labelPath = "name",
    labelPath2,
    labelPathForAddress,
    valuePath = "id",
    isHasMessageError = true,
    helperText,
    required,
    params,
    type,
    sign,
    variant = "standard",
    isViewProp,
    exceptValues,
    fetchDataFn,
    onChangeValue,
    onAfterChangeValue,
    ...restProps
  } = props;

  const isView = isViewProp;
  const [page, setPage] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 700);
  const [data, setData] = useState<any>([]);
  const [dataPage0, setDataPage0] = useState<any>([]);

  const convertParam = JSON.stringify(params);
  const convertExceptValues = JSON.stringify(exceptValues);

  const handleSearchData = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchDataFn(
      {
        page: 0,
        size: 20,
        search: debounceSearch,
        ...(params ? params : {}),
      },
      type
    );

    if (data && Array.isArray(data.data.content)) {
      const dataValue = [
        ...data.data.content.map((item: any) => ({
          ...item,
          [labelPath]: get(item, labelPath),
          [valuePath]: get(item, valuePath),
        })),
      ];

      setData(() =>
        exceptValues
          ? dataValue.filter((obj) => {
              return !exceptValues.some(
                (item: any) => item[valuePath] === obj[valuePath]
              );
            })
          : dataValue
      );
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam]);

  const handleFetchData = useCallback(
    async (isPreApply: boolean, pageOption?: number) => {
      try {
        setIsLoading(true);
        const pageValue = pageOption ?? page;

        if (pageValue !== 0 && pageValue >= totalPages) {
          setIsLoading(false);
          return;
        }
        const data = await fetchDataFn(
          {
            page: pageValue,
            size: 20,
            ...(params ? params : {}),
          },
          type
        );

        if (data && Array.isArray(data.data.content)) {
          const dataValue = data.data.content.map((item: any) => ({
            ...item,
            [labelPath]: get(item, labelPath),
            [valuePath]: get(item, valuePath),
          }));

          if (pageValue === 0) {
            setDataPage0(dataValue);
          }

          setData((pre: any) => {
            const newVal = [...(isPreApply ? pre : []), ...dataValue];

            return exceptValues
              ? newVal.filter((obj) => {
                  return !exceptValues.some(
                    (item: any) => item[valuePath] === obj[valuePath]
                  );
                })
              : newVal;
          });

          setTotalPages(data.data.totalPages);
        }

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast.error(t("common.error"));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, totalPages, convertParam]
  );

  useEffect(() => {
    try {
      if (isClick && !disabled && !readOnly) handleFetchData(false);
    } catch (error) {
      toast.error(t("common.error"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, convertParam, convertExceptValues]);

  useEffect(() => {
    if (isClick && !disabled && !readOnly) {
      if (debounceSearch) {
        handleSearchData();
      } else {
        setPage(() => 0);
        setData(dataPage0);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearch, convertParam]);

  const handleScroll = async (e: any) => {
    const listBoxNode = e.currentTarget;
    const currentHeight = listBoxNode.scrollTop + listBoxNode.clientHeight;

    if (listBoxNode.scrollHeight - currentHeight <= 1) {
      setPage((prev) => prev + 1);
      await handleFetchData(true, page + 1);
    }
  };

  return (
    <div
      onClick={() => {
        if (!readOnly && !disabled && !isView && !isClick) setIsClick(true);
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              forcePopupIcon={!isView}
              multiple={multiple}
              disableCloseOnSelect={multiple}
              value={value ? value : multiple ? [] : null}
              options={data}
              disabled={disabled}
              readOnly={readOnly || isView}
              loading={isLoading}
              noOptionsText={t("form.autocomplete.no_options")}
              onBlur={onBlur}
              onChange={(e, value: any) => {
                onChange(value);
                if (onChangeValue) onChangeValue(value);
                if (onAfterChangeValue) onAfterChangeValue();
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    style={{
                      borderRadius: 4,
                      height: 22,
                      borderColor: "GrayText",
                      color: "gray",
                      marginTop: 0,
                    }}
                    classes={{
                      label: "p-2 pl-5",
                    }}
                    label={
                      labelPath2
                        ? get(option, labelPath2) +
                          " - " +
                          get(option, labelPath)
                        : get(option, labelPath)
                    }
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon sx={{ width: 16 }} />}
                    key={index}
                  />
                ))
              }
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath);
                }
                return get(option, valuePath) === value;
              }}
              getOptionLabel={(option) => {
                if (labelPathForAddress) {
                  return (
                    get(option, labelPath) +
                    " - " +
                    get(option, "ward") +
                    " - " +
                    get(option, "district") +
                    " - " +
                    get(option, "city")
                  );
                }
                return (
                  (labelPath2
                    ? get(option, labelPath2) +
                      (sign ? sign : " - ") +
                      get(option, labelPath)
                    : get(option, labelPath)) ?? ""
                );
              }}
              renderOption={(props, option: any) => {
                return (
                  <li {...props}>
                    <Typography variant="body2" title={get(option, labelPath)}>
                      {labelPathForAddress
                        ? get(option, labelPath) +
                          " - " +
                          get(option, "ward") +
                          " - " +
                          get(option, "district") +
                          " - " +
                          get(option, "city")
                        : labelPath2
                          ? get(option, labelPath2) +
                            (sign ? sign : " - ") +
                            get(option, labelPath)
                          : get(option, labelPath)}
                    </Typography>
                  </li>
                );
              }}
              filterOptions={(options, params: FilterOptionsState<any>) => {
                setSearch(params.inputValue);
                return options;
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant={isView ? "standard" : (variant as any)}
                    inputRef={ref}
                    label={label}
                    error={!!(error || helperText)}
                    helperText={error && isHasMessageError && error.message}
                    placeholder={
                      (multiple ? !!value?.length : !!value)
                        ? ""
                        : placeholder ||
                          t("form.autocomplete.placeholder", {
                            label:
                              typeof label === "string"
                                ? label?.toLowerCase()
                                : label,
                          }).toString()
                    }
                    InputLabelProps={{
                      // ...params.InputLabelProps,
                      shrink: true,
                      required,
                    }}
                    InputProps={{
                      disableUnderline: isView,
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {isLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              ListboxProps={{
                onScroll: async (e) => {
                  await handleScroll(e);
                },
              }}
              {...restProps}
            />
          );
        }}
        rules={!isView ? rules : {}}
      />
    </div>
  );
};

export default React.memo(CoreSelectCustomAPI);
