import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import memoize from 'lodash/memoize';
import { utils } from 'styled-minimal';
import Select, { components } from 'react-select';
import TextTruncate from 'react-text-truncate';
import FloatLabel from 'components/FloatLabel';

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

const IndicatorSeparator = ({ innerProps }) => {
  return <span {...innerProps} />;
};

IndicatorSeparator.propTypes = {
  innerProps: PropTypes.object,
};

const OptInner = ({ name, code }) => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: 'calc(100% - 25px)' }}>
      <TextTruncate line={1} text={name} />
    </div>
    <InlineGrayBox>{code}</InlineGrayBox>
  </div>
);

OptInner.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const OptionInner = React.memo(OptInner);

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

class StyledSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  inputRef = null;

  getComponents = (comp, withGrayBox, withDropdownIndicator, withIndicatorSeparator) => {
    const addition = withGrayBox
      ? { Control: this.ControlComponent, Option, Input: this.Input }
      : {};
    Object.assign(addition, withDropdownIndicator ? {} : { DropdownIndicator });
    Object.assign(addition, withIndicatorSeparator ? {} : { IndicatorSeparator });
    return Object.assign({}, comp, addition);
  };

  setMenuState = state => {
    this.setState({
      isOpen: state,
    });
  };

  onChange = e => {
    const { onChange } = this.props;
    this.setMenuState(false);

    if (onChange) {
      onChange(e);
    }
  };

  onBlur = e => {
    const { onBlur } = this.props;
    this.setMenuState(false);

    if (onBlur) {
      onBlur(e);
    }
  };

  ControlComponent = props => {
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
        <FloatLabel
          isOpen={
            props.selectProps.isOpen || !!props.selectProps.value || !!props.selectProps.inputValue
          }
          label={props.selectProps.placeholder}
          clickHandler={() => {
            this.setMenuState(true);
            if (this.inputRef) {
              this.inputRef.focus();
            }
          }}
        />

        <components.Control {...props}>
          {children}
          {box}
        </components.Control>
      </div>
    );
  };

  Input = props => {
    return (
      <components.Input
        {...props}
        innerRef={input => {
          this.inputRef = input;
          return props.innerRef(input);
        }}
      />
    );
  };

  render() {
    const {
      theme,
      withGrayBox,
      components: comp,
      withDropdownIndicator,
      withIndicatorSeparator,
      menuIsOpen,
    } = this.props;
    const { isOpen } = this.state;
    const LocalStyledSelect = GetStyledSelect(theme.sizes.inputMinWidth);

    return (
      <LocalStyledSelect
        {...this.props}
        menuIsOpen={isOpen || menuIsOpen}
        autoFocus={isOpen}
        components={this.getComponents(
          comp,
          withGrayBox,
          withDropdownIndicator,
          withIndicatorSeparator,
        )}
        onChange={this.onChange}
        onBlur={this.onBlur}
        styles={{
          option: provided => ({
            ...provided,
            textAlign: 'left',
          }),
          placeholder: provided => ({
            ...provided,
            display: 'none',
          }),
          input: provided => ({
            ...provided,
            paddingTop: '10px',
          }),
          singleValue: provided => ({
            ...provided,
            paddingTop: '10px',
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
  }
}

StyledSelect.propTypes = {
  components: PropTypes.object,
  menuIsOpen: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  theme: PropTypes.object,
  withDropdownIndicator: PropTypes.bool,
  withGrayBox: PropTypes.bool,
  withIndicatorSeparator: PropTypes.bool,
};

StyledSelect.defaultProps = {
  components: {},
};

export default withTheme(StyledSelect);
