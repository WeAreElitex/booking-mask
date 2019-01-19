import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import memoize from 'lodash/memoize';
import { utils } from 'styled-minimal';
import Select, { components } from 'react-select';
import TextTruncate from 'react-text-truncate';

const { spacer } = utils;

const GrayBox = styled.div`
  color: #eee;
  background-color: #555;
  font-size: 1.2rem;
  text-align: center;
  padding: 3px 5px 3px 5px;
  border: 4px solid white;
  border-radius: 6px !important;
`;

const InlineGrayBox = styled(GrayBox)`
  display: block;
  border: none;
  padding-top: 2px;
  padding-bottom: 2px;
  margn-left: 2rem;
  border-radius: 3px !important;
  min-width: 35px;
`;

const GrayBoxWrapper = styled.div`
  top: 0;
  bottom: 0;
  min-width: 40px;
  right: 10px;
  position: absolute;
  display: flex;
  align-items: center;
`;

const GetStyledSelect = memoize(
  minWidth =>
    styled(Select)`
      width: 100%;
      height: 100%;
      & > div {
        border-radius: 0;
        width: 100%;
        min-width: ${minWidth}px;
        & > div:first-cild {
          width: 100%;
        }
      }
      .control-wrapper {
        position: 'absolute';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        & > div {
          width: 100%;
          height: 100%;
        }
      }
      padding: 0;
      padding-bottom: ${spacer(1)};
      padding-top: ${spacer(1)};
    `,
);

const ControlComponent = props => {
  const { selectProps, hasValue, children } = props;
  const code = selectProps.value ? selectProps.value.code : '';
  const box = hasValue ? (
    <GrayBoxWrapper>
      {' '}
      <GrayBox>{code}</GrayBox>{' '}
    </GrayBoxWrapper>
  ) : (
    ''
  );

  return (
    <div className="control-wrapper">
      <components.Control {...props}>
        {children}
        {box}
      </components.Control>
    </div>
  );
};

ControlComponent.propTypes = {
  selectProps: PropTypes.object,
  hasValue: PropTypes.bool,
  children: PropTypes.array,
};

const IndicatorSeparator = ({ innerProps }) => {
  return <span {...innerProps} />;
};

IndicatorSeparator.propTypes = {
  innerProps: PropTypes.object.isRequired,
};

const OptionInner = React.memo(({ name, code }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: 'calc(100% - 25px)' }}>
      <TextTruncate line={1} text={name} />
    </div>
    <InlineGrayBox>{code}</InlineGrayBox>
  </div>
));

OptionInner.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};

const Option = props => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <OptionInner name={data.name} code={data.code} />
    </components.Option>
  );
};

Option.propTypes = {
  data: PropTypes.object.isRequired,
};

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <span />
      </components.DropdownIndicator>
    )
  );
};

const getComponents = (comp, withGrayBox, withDropdownIndicator, withIndicatorSeparator) => {
  const addition = withGrayBox ? { Control: ControlComponent, Option } : {};
  Object.assign(addition, withDropdownIndicator ? {} : { DropdownIndicator });
  Object.assign(addition, withIndicatorSeparator ? {} : { IndicatorSeparator });
  return Object.assign({}, comp, addition);
};

const StyledSelect = ({
  components: comp,
  theme,
  withGrayBox,
  withDropdownIndicator,
  withIndicatorSeparator,
  ...props
}) => {
  const LocalStyledSelect = GetStyledSelect(theme.sizes.inputMinWidth);

  return (
    <LocalStyledSelect
      components={getComponents(comp, withGrayBox, withDropdownIndicator, withIndicatorSeparator)}
      {...props}
      styles={{
        option: provided => ({
          ...provided,
          textAlign: 'left',
        }),
      }}
      theme={componentTheme => ({
        ...componentTheme,
        borderRadius: 0,
        colors: {
          ...componentTheme.colors,
          primary25: theme.palette.secondary,
          primary50: theme.palette.actionColor,
          primary: theme.palette.appColor,
        },
      })}
    />
  );
};

StyledSelect.propTypes = {
  components: PropTypes.object,
  theme: PropTypes.object,
  withGrayBox: PropTypes.bool,
  withDropdownIndicator: PropTypes.bool,
  withIndicatorSeparator: PropTypes.bool,
};

StyledSelect.defaultProps = {
  components: {},
};

export default React.memo(StyledSelect);
