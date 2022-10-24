/*
 * Copyright 2022 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Callout, Code, H5, Switch } from "@blueprintjs/core";
import { DateFormatProps, DateRange, TimePrecision } from "@blueprintjs/datetime";
import { DateRangeInput2 } from "@blueprintjs/datetime2";
import { Example, ExampleProps, handleBooleanChange, handleValueChange } from "@blueprintjs/docs-theme";

import { PrecisionSelect } from "../datetime-examples/common/precisionSelect";
import { DateFnsDateRange } from "./dateFnsDate";
import { DATE_FNS_FORMATS, DateFnsFormatSelector } from "./dateFnsFormatSelector";

const exampleFooterElement = (
    <Callout style={{ maxWidth: 460 }}>
        A custom footer element may be displayed below the date range picker calendars using the{" "}
        <Code>footerElement</Code> prop.
    </Callout>
);

export interface DateRangeInput2ExampleState {
    allowSingleDayRange: boolean;
    closeOnSelection: boolean;
    contiguousCalendarMonths: boolean;
    disabled: boolean;
    enableTimePicker: boolean;
    format: DateFormatProps;
    range: DateRange;
    reverseMonthAndYearMenus: boolean;
    selectAllOnFocus: boolean;
    shortcuts: boolean;
    showFooterElement: boolean;
    showTimeArrowButtons: boolean;
    singleMonthOnly: boolean;
    timePrecision: TimePrecision | undefined;
}

export class DateRangeInput2Example extends React.PureComponent<ExampleProps, DateRangeInput2ExampleState> {
    public state: DateRangeInput2ExampleState = {
        allowSingleDayRange: false,
        closeOnSelection: false,
        contiguousCalendarMonths: true,
        disabled: false,
        enableTimePicker: false,
        format: DATE_FNS_FORMATS[0],
        range: [null, null],
        reverseMonthAndYearMenus: false,
        selectAllOnFocus: false,
        shortcuts: true,
        showFooterElement: false,
        showTimeArrowButtons: false,
        singleMonthOnly: false,
        timePrecision: TimePrecision.MINUTE,
    };

    private toggleContiguous = handleBooleanChange(contiguous => {
        this.setState({ contiguousCalendarMonths: contiguous });
    });

    private toggleDisabled = handleBooleanChange(disabled => this.setState({ disabled }));

    private toggleReverseMonthAndYearMenus = handleBooleanChange(reverseMonthAndYearMenus =>
        this.setState({ reverseMonthAndYearMenus }),
    );

    private toggleSelection = handleBooleanChange(closeOnSelection => this.setState({ closeOnSelection }));

    private toggleSelectAllOnFocus = handleBooleanChange(selectAllOnFocus => this.setState({ selectAllOnFocus }));

    private toggleShowFooterElement = handleBooleanChange(showFooterElement => this.setState({ showFooterElement }));

    private toggleSingleDay = handleBooleanChange(allowSingleDayRange => this.setState({ allowSingleDayRange }));

    private toggleSingleMonth = handleBooleanChange(singleMonthOnly => this.setState({ singleMonthOnly }));

    private toggleShortcuts = handleBooleanChange(shortcuts => this.setState({ shortcuts }));

    private toggleTimePicker = handleBooleanChange(enableTimePicker => this.setState({ enableTimePicker }));

    private toggleTimepickerArrowButtons = handleBooleanChange(showTimeArrowButtons =>
        this.setState({ showTimeArrowButtons }),
    );

    private handleTimePrecisionChange = handleValueChange((timePrecision: TimePrecision | "none") =>
        this.setState({ timePrecision: timePrecision === "none" ? undefined : timePrecision }),
    );

    public render() {
        const {
            enableTimePicker,
            format,
            range,
            showFooterElement,
            showTimeArrowButtons,
            timePrecision,
            ...spreadProps
        } = this.state;
        return (
            <Example options={this.renderOptions()} {...this.props}>
                <DateRangeInput2
                    {...spreadProps}
                    {...format}
                    onChange={this.handleRangeChange}
                    footerElement={showFooterElement ? exampleFooterElement : undefined}
                    timePickerProps={
                        enableTimePicker
                            ? { precision: timePrecision, showArrowButtons: showTimeArrowButtons }
                            : undefined
                    }
                />
                <DateFnsDateRange range={range} />
            </Example>
        );
    }

    protected renderOptions() {
        return (
            <>
                <H5>Props</H5>
                <Switch
                    checked={this.state.allowSingleDayRange}
                    label="Allow single day range"
                    onChange={this.toggleSingleDay}
                />
                <Switch
                    checked={this.state.singleMonthOnly}
                    label="Single month only"
                    onChange={this.toggleSingleMonth}
                />
                <Switch checked={this.state.shortcuts} label="Show shortcuts" onChange={this.toggleShortcuts} />
                <Switch
                    checked={this.state.closeOnSelection}
                    label="Close on selection"
                    onChange={this.toggleSelection}
                />
                <Switch
                    checked={this.state.contiguousCalendarMonths}
                    label="Constrain calendar to contiguous months"
                    onChange={this.toggleContiguous}
                />
                <Switch checked={this.state.disabled} label="Disabled" onChange={this.toggleDisabled} />
                <Switch
                    checked={this.state.selectAllOnFocus}
                    label="Select all on focus"
                    onChange={this.toggleSelectAllOnFocus}
                />
                <Switch
                    checked={this.state.reverseMonthAndYearMenus}
                    label="Reverse month and year menus"
                    onChange={this.toggleReverseMonthAndYearMenus}
                />
                <Switch
                    checked={this.state.showFooterElement}
                    label="Show custom footer element"
                    onChange={this.toggleShowFooterElement}
                />
                <Switch
                    checked={this.state.enableTimePicker}
                    label="Enable time picker"
                    onChange={this.toggleTimePicker}
                />
                <Switch
                    disabled={!this.state.enableTimePicker}
                    checked={this.state.showTimeArrowButtons}
                    label="Show timepicker arrow buttons"
                    onChange={this.toggleTimepickerArrowButtons}
                />
                <PrecisionSelect
                    allowNone={false}
                    disabled={!this.state.enableTimePicker}
                    label="Time precision"
                    onChange={this.handleTimePrecisionChange}
                    value={this.state.timePrecision}
                />
                <DateFnsFormatSelector key="Format" format={this.state.format} onChange={this.handleFormatChange} />
            </>
        );
    }

    private handleFormatChange = (format: DateFormatProps) => this.setState({ format });

    private handleRangeChange = (range: DateRange) => this.setState({ range });
}