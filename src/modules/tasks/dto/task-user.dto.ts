export type TaskUserRequestDTO = {
  userId: string;
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  priority: 'BAIXA' | 'MEDIA' | 'ALTA';
  status: 'PENDENTE' | 'CONCLUIDA' | 'ANDAMENTO';
};

export type TaskUserResponseDTO = {
  id: string;
};
