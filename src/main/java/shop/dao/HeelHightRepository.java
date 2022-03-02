package shop.dao;

import shop.entity.HeelHight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "heels", path = "heels")
public interface HeelHightRepository extends JpaRepository<HeelHight, Long> {
}
