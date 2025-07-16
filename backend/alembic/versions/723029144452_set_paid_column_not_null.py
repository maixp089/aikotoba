"""Set paid column NOT NULL

Revision ID: 723029144452
Revises: 763ed295c1cf
Create Date: 2025-07-16 13:32:27.005418

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '723029144452'
down_revision: Union[str, Sequence[str], None] = '763ed295c1cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # paidカラムを NOT NULL 制約に変更
    op.alter_column('users', 'paid', nullable=False)

def downgrade() -> None:
    # ロールバック時はNULL許可に戻す
    op.alter_column('users', 'paid', nullable=True)

