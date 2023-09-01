import json

# 数据+标题
raw_data = [[y for y in x.strip().split("\t") if y] for x in open("./public/ratings.txt")]
# print(raw_data[0])
# ['Rating', 'ID', 'Title', 'Title ZH', 'Title Slug', 'Contest Slug', 'Problem Index']

# 标题 去除空格
title = [x.replace(" ", "") for x in raw_data[0]] + ["ContestEN"] + ["Contest"]

# 按喜好命名
title[2] = 'TitleEN'
title[3] = 'Title'
# print(title)
# ['Rating', 'ID', 'TitleEN', 'Title', 'TitleSlug', 'ContestSlug', 'ProblemIndex', 'Contest', 'ContestEN']

# 数据
body = raw_data[1:]


def contest_slug_to_id_en(contest_slug: str) -> str:
    idx = contest_slug.split("-")[-1]
    if contest_slug.startswith("bi"):
        return f"Biweekly Contest {idx}"
    else:
        return f"Weekly Contest {idx}"
#
#
def contest_slug_to_id_zh(contest_slug: str) -> str:
    idx = contest_slug.split("-")[-1]
    if contest_slug.startswith("bi"):
        return f"第 {idx} 场双周赛"
    else:
        return f"第 {idx} 场周赛"
#
#
obj = list()
single = list()
bi = list()
for line in body:
    line = [round(float(line[0])), int(line[1]), line[2], line[3], line[4], line[5], line[6], contest_slug_to_id_en(line[5]),
            contest_slug_to_id_zh(line[5])]

    # 所有数据，用于题目页展示
    obj.append({k: v for k, v in zip(title, line)})
    # 单双周赛数据，用于分数页展示
    if line[5].startswith('bi'):
        bi.append({k: v for k, v in zip(title, line)})
    else:
        single.append({k: v for k, v in zip(title, line)})

# 默认按最新ID序号排序
def takeID(item):
    return item['ID']
obj.sort(key=takeID, reverse=True)
single.sort(key=takeID)
bi.sort(key=takeID)
with open("./public/data.json", "w") as fout:
    json.dump(obj, fout)

with open("./public/single.json", "w") as fout:
    json.dump(single, fout)

with open("./public/bi.json", "w") as fout:
    json.dump(bi, fout)