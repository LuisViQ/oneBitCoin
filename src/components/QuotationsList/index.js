import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './style';
import QuotationsItems from './QuotationsItems';

const FILTER_BUTTONS = [
    { label: "7D", value: 7 },
    { label: "15D", value: 15 },
    { label: "1M", value: 30 },
    { label: "3M", value: 90 },
    { label: "6M", value: 180 },
];

export default function QuotationsList(props) {
    const daysQuery = props.filterDay;

    return (
        <>
            <View style={styles.filters}>
                {FILTER_BUTTONS.map((button) => {
                    const isSelected = props.selectedDays === button.value;

                    return (
                        <TouchableOpacity
                            key={button.value}
                            style={[styles.buttonQuery, isSelected && styles.buttonQueryActive]}
                            onPress={() => daysQuery(button.value)}
                        >
                            <Text style={[styles.textButtonQuery, isSelected && styles.textButtonQueryActive]}>
                                {button.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
                <FlatList 
                    data={props.listTransactions}
                    keyExtractor={(item, index) => `${item.date}-${index}`}
                    renderItem={({item}) => {
                        return <QuotationsItems value={item.value} date={item.date} />
                    }}
                />
        </>
    )
}
