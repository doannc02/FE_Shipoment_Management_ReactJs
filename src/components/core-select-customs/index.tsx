import CloseIcon from "@mui/icons-material/Close";
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FormHelperText,
  InputBaseProps,
  OutlinedInputProps,
  TextField,
  Typography,
} from "@mui/material";
import { find, get, isObject, map } from "lodash";
import { useTranslation } from "react-i18next";
import React, { ReactNode, useCallback } from "react";
import { Controller } from "react-hook-form";

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "renderInput"
  > {
  control: any;
  name: string;
  label?: string | null;
  InputLabelProps?: any;
  inputProps?: InputBaseProps["inputProps"];
  InputProps?: Partial<OutlinedInputProps>;
  required?: boolean;
  valuePath?: string;
  labelPath2?: string;
  labelPath?: string;
  loading?: boolean;
  isHasMessageError?: boolean;
  returnValueType?: "enum" | "option";
  helperText?: ReactNode | string;
  AutoCompleteClassName?: string;
  defaultValue?: any;
  rules?: any;
  isCreateAble?: boolean;
  onAfterChangeValue?: any;
  errCustom?: boolean;
  variant?: "outlined" | "filled" | "standard";
  isViewProp?: boolean;
  onChangeValue?: (val: any) => void;
}

const CoreSelectCustom: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined,
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const {
    className,
    control,
    name,
    options,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    valuePath = "value",
    labelPath2,
    labelPath = "label",
    loading,
    isHasMessageError = true,
    returnValueType = "enum",
    multiple,
    disabled,
    helperText,
    isCreateAble,
    AutoCompleteClassName,
    rules,
    defaultValue,
    size,
    errCustom,
    variant = "standard",
    isViewProp,
    onChangeValue,
    onAfterChangeValue,
    renderOption,
    ...restProps
  } = props;

  const { t } = useTranslation("common");

  const isView = isViewProp;

  const getValueOption = useCallback(
    (value: any) => {
      if (multiple) {
        if (isCreateAble) {
          return value;
        }
        return map(value, (v) => {
          if (!isObject(v)) {
            return (
              find(options, (item) => {
                return get(item, valuePath) === v;
              }) ?? null
            );
          }
          return v;
        });
      }

      if (returnValueType === "enum") {
        return find(options, (item) => get(item, valuePath) === value) ?? null;
      }

      return value;
    },
    [isCreateAble, multiple, options, returnValueType, valuePath]
  );

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          return (
            <Autocomplete
              forcePopupIcon={!isView}
              className={AutoCompleteClassName}
              multiple={multiple}
              disableCloseOnSelect={multiple}
              defaultValue={defaultValue}
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath);
                }
                return get(option, valuePath) === value;
              }}
              getOptionLabel={(option) => {
                return (
                  (labelPath2
                    ? get(option, labelPath2) + " - " + get(option, labelPath)
                    : get(option, labelPath)) ?? ""
                );
              }}
              loading={loading}
              options={options}
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
                    label={get(option, labelPath)}
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon sx={{ width: 16 }} />}
                    key={index}
                  />
                ))
              }
              noOptionsText={t("form.autocomplete.no_options")}
              disabled={disabled}
              readOnly={isView || readOnly}
              onChange={(_, value: any) => {
                if (onChangeValue) {
                  returnValueType === "enum"
                    ? onChangeValue(
                        multiple
                          ? value.map((v: any) => get(v, valuePath))
                          : (get(value, valuePath) ?? null)
                      )
                    : onChangeValue(value);
                }
                returnValueType === "enum"
                  ? onChange(
                      multiple
                        ? value.map((v: any) => get(v, valuePath))
                        : (get(value, valuePath) ?? null)
                    )
                  : onChange(value);

                if (onAfterChangeValue) onAfterChangeValue();
              }}
              onBlur={onBlur}
              value={getValueOption(value) ?? (multiple ? [] : null)}
              renderOption={(props, option: any) => {
                return (
                  <li {...props} key={get(option, valuePath)}>
                    <Typography variant="body1" title={get(option, labelPath)}>
                      {labelPath2
                        ? get(option, labelPath2) +
                          " - " +
                          get(option, labelPath)
                        : get(option, labelPath)}
                    </Typography>
                  </li>
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    variant={variant}
                    placeholder={
                      placeholder ??
                      t("form.autocomplete.placeholder", {
                        label,
                      }).toString()
                    }
                    inputRef={ref}
                    label={label}
                    error={!!(error || errCustom)}
                    helperText={error && isHasMessageError && error.message}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                      required,
                      ...InputLabelProps,
                    }}
                    inputProps={{
                      ...params.inputProps,
                      ...inputProps,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      disableUnderline: isView,
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),

                      ...InputProps,
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              {...restProps}
            />
          );
        }}
        rules={!isView ? rules : {}}
      />
    </div>
  );
};

export default React.memo(CoreSelectCustom);
