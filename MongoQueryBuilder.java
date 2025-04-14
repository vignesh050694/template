package com.frigate.mongo_connector.config;

import com.frigate.frigate_commons.dto.pagination.PaginationDto;
import com.frigate.frigate_commons.dto.pagination.SearchCriteria;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Component
public class MongoQueryBuilder {

    public Query buildQueryFromSearchCriteria(List<SearchCriteria> filters) {
        if (filters == null || filters.isEmpty()) {
            return new Query();
        }

        List<Criteria> andCriteria = new ArrayList<>();
        List<Criteria> orCriteria = new ArrayList<>();

        for (SearchCriteria sc : filters) {
            Criteria criteria = switch (sc.getOperation().toLowerCase()) {
                case "eq" -> Criteria.where(sc.getKey()).is(sc.getValue());
                case "ne" -> Criteria.where(sc.getKey()).ne(sc.getValue());
                case "gt" -> Criteria.where(sc.getKey()).gt(sc.getValue());
                case "lt" -> Criteria.where(sc.getKey()).lt(sc.getValue());
                case "gte" -> Criteria.where(sc.getKey()).gte(sc.getValue());
                case "lte" -> Criteria.where(sc.getKey()).lte(sc.getValue());
                case "in" -> Criteria.where(sc.getKey()).in(sc.getValues());
                case "nin" -> Criteria.where(sc.getKey()).nin(sc.getValues());
                case "regex" -> Criteria.where(sc.getKey()).regex(Pattern.compile(sc.getValue().toString(), Pattern.CASE_INSENSITIVE));
                default -> throw new IllegalArgumentException("Unsupported operation: " + sc.getOperation());
            };

            if (Boolean.TRUE.equals(sc.getOrPredicate())) {
                orCriteria.add(criteria);
            } else {
                andCriteria.add(criteria);
            }
        }

        Criteria finalCriteria;
        if (!orCriteria.isEmpty() && !andCriteria.isEmpty()) {
            finalCriteria = new Criteria().andOperator(
                    new Criteria().orOperator(orCriteria.toArray(new Criteria[0])),
                    new Criteria().andOperator(andCriteria.toArray(new Criteria[0]))
            );
        } else if (!orCriteria.isEmpty()) {
            finalCriteria = new Criteria().orOperator(orCriteria.toArray(new Criteria[0]));
        } else {
            finalCriteria = new Criteria().andOperator(andCriteria.toArray(new Criteria[0]));
        }

        return new Query(finalCriteria);
    }

    public void applyPaginationAndSorting(Query query, PaginationDto dto) {
        if (dto.getSort() != null && dto.getSortDirection() != null) {
            Sort.Direction direction = dto.getSortDirection().equalsIgnoreCase("desc") ?
                    Sort.Direction.DESC : Sort.Direction.ASC;
            query.with(Sort.by(direction, dto.getSort()));
        }

        int skip = (dto.getPageNo() - 1) * dto.getPageSize();
        query.skip(skip).limit(dto.getPageSize());
    }
}