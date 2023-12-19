

  export function calculatePagination(
    limit: number,
    total: number,
    current_page: number = 1,
  ) {
    // if(!limit) limit = undefined
    let total_pages = Math.ceil(total / (limit)) || 1;
    let per_page = limit || total;
    let startItemInPage = current_page * limit - limit + 1 || 1;
    let meta = {
      total,
      total_pages,
      current_page,
      per_page,
      startItemInPage,
    };
    return meta;
  }

