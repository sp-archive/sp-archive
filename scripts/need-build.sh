message=$(git cat-file -p $COMMIT_REF) # 当前 commit message
footer=$(echo "$message" | tail -n 1) # 最后一行

result=$(echo $footer | grep "skip netlify") # 是否需要跳过

if [[ $result == "" ]]; then
  exit 1
else
  exit 0
fi
