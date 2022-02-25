import { Feather } from "@expo/vector-icons"
import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { string, instanceOf, shape, arrayOf } from "prop-types"
import { dateToString } from "../utils"

export default function MemoList(props) {
  const { memos } = props
  const navigation = useNavigation()
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memoListItem}
      onPress={() => {
        navigation.navigate("MemoDetail", { id: item.id })
      }}
    >
      <View>
        <Text style={styles.memoListItemTitle} numberOfLines={1}>
          {item.bodyText}
        </Text>
        <Text style={styles.memoListItemDate}>
          {dateToString(item.updatedAt)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.memoDelete}
        onPress={() => {
          Alert.alert("Are you sure?")
        }}
      >
        <Feather name='x' size={16} color='#b0b0b0' />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

MemoList.propTypes = {
  memos: arrayOf(
    shape({
      id: string,
      bodyText: string,
      updatedAt: instanceOf(Date),
    })
  ).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  memoDelete: {
    padding: 8,
  },
})
